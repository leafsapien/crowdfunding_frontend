import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import useCurrentUser from '../hooks/use-current-user';


function MydetailsPage() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user, isLoading, error } = useCurrentUser(auth?.token);

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

    return ( 
        <div className="mydetails-container">
            <h1 className="mydetails-title">{user.username}&apos;s Details</h1>
            
            {/* User Details Box */}
            <div className="user-details-box">
                <p>Username: {user.username}</p>
                <p>Name: {user.first_name} {user.last_name}</p>
                <div className="user-actions">
                    <button onClick={() => navigate(`/mydetails/edit`)}>Update My Details/Password</button>
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
                                        <button onClick={() => navigate(`/delete`)} className="delete-button">Delete</button>
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
                                        <button onClick={() => navigate(`/delete`)} className="delete-button">Delete</button>
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