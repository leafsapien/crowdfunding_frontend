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
        <div>
            <h1>{user.username}'s Details</h1>
            {/* Current User's Projects */} 
            <h2>Your Projects</h2>
            {user.projects.length > 0 ? (
                <ul>
                    {user.projects.map((project) => (
                    <li key={project.id}>
                    <h3>{project.title}</h3>
                    <p>Goal: ${project.goal}</p>
                    <p>Data Created: {new Date(project.date_created).toLocaleString()}</p>
                    <p>Status: {project.is_open ? "Open" : "Closed"}</p>
                    <button onClick={() => navigate(`/project/${project.id}`)}>View/Edit Project</button>
                    </li>
                    ))}
                </ul>
            ) : (
                <p>You have not created any projects yet.</p>
            )}
            {/* Current User's Pledges */}
            <h2>Your Pledges</h2>
            {user.pledges.length > 0 ? (
                <ul>
                {user.pledges.map((pledge) => (
                    <li key={pledge.id}>
                    <p>Pledge amount ${pledge.amount} to {pledge.project.title}</p>
                    <p>{pledge.anonymous ? "Pledged Anonymously" : `Pledged by: ${user.username}`}</p>
                    <p>Comment: {pledge.comment}</p>
                    <button onClick={() => navigate(`/project/${project.id}`)}>View/Edit Pledge</button>
                    </li>
                ))}
                </ul>
            ) : (
                <p>You have not made any pledges yet.</p>
            )}
            </div>
        );
}
export default MydetailsPage;