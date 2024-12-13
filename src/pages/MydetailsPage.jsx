import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import useCurrentUser from '../hooks/use-current-user';
import deleteProject from '../api/delete-project';
import deletePledge from '../api/delete-pledge';
import { useState } from 'react';


function MydetailsPage() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user, isLoading, error } = useCurrentUser(auth?.token);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const isAdmin = user?.is_superuser;

    if (!auth?.token) {
        return (
            <div>
                <p>You must logged in to view User Details.</p>
                <button onClick={() => navigate("/")}>Return Home</button>
            </div>
        );
    }

    if (isLoading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>{error.message || "Oops! An error occurred, please try again later."}</p>;
    }

    const handleProjectDelete = async (projectId) => {
        if (isAdmin) {
            if (window.confirm('Are you sure you want to delete this project?')) {
                try {
                    await deleteProject(projectId, auth.token);
                    setShowSuccessMessage('Project Deleted Successfully!');
                    setTimeout(() => {
                        setShowSuccessMessage('');
                        navigate(0);  // Refresh the page
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
                        navigate(0);  // Refresh the page
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
        <div className="mydetails-container">
            {showSuccessMessage && (
                <div className="pledge-success-message">
                    {showSuccessMessage}
                </div>
            )}
            <h1 className="mydetails-title">{user.username}&apos;s Details</h1>
            
            {/* User Details Box */}
            <div className="user-details-box">
                <p>Username: {user.username}</p>
                <p>Name: {user.first_name} {user.last_name}</p>
                <div className="user-actions">
                    <button onClick={() => navigate(`/users/${user.id}/edit`)}>Update My Details/Password</button>
                    <button onClick={() => navigate(`/delete`)} className="delete-button">Delete My Account</button>
                </div>
            </div>

            {/* Projects and Pledges Grid */}
            <div className="details-grid">
                {/* Projects Section */}
                <div className="projects-section">
                    <h2>Your Projects</h2>
                    {user.projects.length > 0 ? (
                        <div className="projects-list">
                            {user.projects.map((project) => (
                                <div key={project.id} className="item-card">
                                    <div className="item-content">
                                        <h3>{project.title}</h3>
                                        <p>Goal: ${project.goal}</p>
                                        <p>Created: {new Date(project.date_created).toLocaleString()}</p>
                                        <p>Status: {project.is_open ? "Open" : "Closed"}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => navigate(`/project/${project.id}`)}>View/Edit</button>
                                        <button 
                                            onClick={() => handleProjectDelete(project.id)}
                                            className="delete-button"
                                        >
                                            {isAdmin ? 'Admin Delete' : 'Delete Project'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">You have not created any projects yet.</p>
                    )}
                </div>

                {/* Pledges Section */}
                <div className="pledges-section">
                    <h2>Your Pledges</h2>
                    {user.pledges.length > 0 ? (
                        <div className="pledges-list">
                            {user.pledges.map((pledge) => (
                                <div key={pledge.id} className="item-card">
                                    <div className="item-content">
                                        <p>Amount: ${pledge.amount}</p>
                                        <p>Project: {pledge.project.title}</p>
                                        <p>{pledge.anonymous ? "Anonymous" : `By: ${user.username}`}</p>
                                        <p>Comment: {pledge.comment}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => navigate(`/project/${pledge.project.id}`)}>View/Edit</button>
                                        <button 
                                            onClick={() => handlePledgeDelete(pledge.id)}
                                            className="delete-button"
                                        >
                                            {isAdmin ? 'Admin Delete' : 'Delete Pledge'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">You have not made any pledges yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default MydetailsPage;