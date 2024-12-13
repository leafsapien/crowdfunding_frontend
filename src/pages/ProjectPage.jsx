import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import useCurrentUser from '../hooks/use-current-user';
import deleteProject from '../api/delete-project';
import deletePledge from '../api/delete-pledge';
import { useState, useEffect } from 'react';

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    const { auth } = useAuth();
    const { user } = useCurrentUser(auth?.token);

    const navigate = useNavigate();

    const [showSuccessMessage, setShowSuccessMessage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading ) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const pledges = project.pledges;
    const owner = project.owner; 

    function totalGoal (pledges) {

        const totalGoal = pledges.reduce((sum, pledge) => {
            return sum + (pledge.amount || 0);
        }, 0);
        return totalGoal;
    }

    const isOwner = user?.id === project.owner;
    const isAdmin = user?.is_superuser;

    const handleProjectDelete = async () => {
        if (isAdmin) {
            if (window.confirm('Are you sure you want to delete this project?')) {
                try {
                    await deleteProject(project.id, auth.token);
                    setShowSuccessMessage('Project Deleted Successfully!');
                    setTimeout(() => {
                        setShowSuccessMessage('');
                        navigate('/');
                    }, 2000);
                } catch (error) {
                    if (error.message.includes('403')) {
                        alert('Only administrators can delete projects');
                    } else {
                        console.error('Error deleting project:', error);
                        alert('Failed to delete project');
                    }
                }
            }
        } else {
            navigate('/delete');
        }
    };

    const handlePledgeDelete = async (pledgeId) => {
        if (isAdmin) {
            if (window.confirm('Are you sure you want to delete this pledge?')) {
                try {
                    await deletePledge(pledgeId, auth.token);
                    setShowSuccessMessage('Pledge Deleted Successfully!');
                    setTimeout(() => {
                        setShowSuccessMessage('');
                        navigate(0);
                    }, 2000);
                } catch (error) {
                    if (error.message.includes('403')) {
                        alert('Only administrators can delete pledges');
                    } else {
                        console.error('Error deleting pledge:', error);
                        alert('Failed to delete pledge');
                    }
                }
            }
        } else {
            navigate('/delete');
        }
    };

    return (
        <div className="project-page-container">
            {showSuccessMessage && (
                <div className="pledge-success-message">
                    {showSuccessMessage}
                </div>
            )}
            <h1 className="project-title">{project.title}</h1>
            <p className="project-date">
                Created on: {new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
                }).format(new Date(project.date_created))}
            </p>

            <div className="project-details-box">
                <div className="project-content">
                    <div className="project-main-content">
                        <div className="project-image-container">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-info">
                            <p className="project-description">{project.description}</p>
                        </div>
                    </div>
                    <div className="project-stats">
                        <h4>Goal: ${project.goal}</h4>
                        <h4>Current: ${totalGoal(pledges)}</h4>
                        <p className="project-status">Status: {project.is_open ? 'Open' : 'Closed'}</p>
                    </div>
                </div>
            </div>

            {(isOwner || isAdmin) && auth?.token && (
                <div className="owner-actions">
                    <h2>Manage Project</h2>
                    <div className="action-buttons">
                        {isOwner && (
                            <button onClick={() => navigate(`/project/${project.id}/edit`)}>
                                Edit Project
                            </button>
                        )}
                        <button 
                            onClick={handleProjectDelete}
                            className="delete-button"
                        >
                            {isAdmin ? 'Admin Delete' : 'Delete Project'}
                        </button>
                    </div>
                </div>
            )}

            <div className="pledges-section">
                <h2>Pledges</h2>
                <div className="pledges-list">
                    {project.pledges.map((pledge, key) => (
                        <div key={key} className="pledge-box">
                            <h3 className="pledge-supporter">
                                {pledge.anonymous 
                                    ? 'Anonymous' 
                                    : `${project.pledgeMap[String(pledge.id)]}` || 'Unknown Supporter'}
                            </h3>
                            <p className="pledge-amount">Amount: ${pledge.amount || '0'}</p>
                            <p className="pledge-comment">{pledge.comment || 'No comment'}</p>
                            
                            {(user?.id === pledge.supporter || isAdmin) && (
                                <div className="pledge-actions">
                                    {user?.id === pledge.supporter && (
                                        <button 
                                            onClick={() => navigate(`/pledge/${pledge.id}/edit`)}
                                            className="edit-button"
                                        >
                                            Edit Pledge
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => handlePledgeDelete(pledge.id)}
                                        className="delete-button"
                                    >
                                        {isAdmin ? 'Admin Delete' : 'Delete Pledge'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {project.is_open && auth?.token && (
                <div className="pledge-form-container">
                    <h2 className="pledge-form-title">Make a Pledge</h2>
                    <PledgeForm projectID={project.id} />
                </div>
            )}

            {project.is_open && !auth?.token && (
                <div className="login-prompt">
                    <button onClick={() => navigate("/login")}>Log In to add a Pledge</button>
                </div>
            )}

            {!project.is_open && <p className="closed-message">This project is closed for pledges.</p>}
        </div>
    );
}

export default ProjectPage;
