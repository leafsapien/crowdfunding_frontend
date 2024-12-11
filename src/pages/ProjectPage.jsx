import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../hooks/use-auth';

import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import PledgeCard from '../components/PledgeCard';
import usePledge from '../hooks/use-pledge';

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    const { pledge } = usePledge(id);
    const { auth } = useAuth();
    const navigate = useNavigate();

    if (isLoading ) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const pledges = project.pledges;

    function totalGoal (pledges) {

        const totalGoal = pledges.reduce((sum, pledge) => {
            return sum + (pledge.amount || 0);
        }, 0);
        return totalGoal;
    }

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>Created at: {format(new Date(project.date_created), "EEE, dd MMMM yyyy, hh:mm a")}</h3>
            <h3>{`Status: ${project.is_open ? 'Open' : 'Closed'}`}</h3>
            <img src={project.image} />
            <p>{project.description}</p>
            <h4>Project Funding Goal: ${project.goal}</h4>
            <h4>Current Goal Status: ${totalGoal(pledges)}</h4>

            <h3>Pledges:</h3>
                <ul>
                    {pledges.map((pledge) => (
                        <li key={pledge.id}>
                            <PledgeCard pledgeData={pledge} />
                        </li>
                    ))}
                    
                </ul>
            
            {project.is_open && auth.token (
                <div>
                <h3>Make a Pledge</h3>
                <PledgeForm projectID={project.id} />
                </div>
            )}
            {project.is_open && !auth.token && (
            <button onClick={navigate("/LoginPage")}>Log In to add a Pledge</button>
        )}
            {!project.is_open && <p>This project is closed for pledges.</p>}

            {isOwner && (
                <div>
                    <h2>Manage Project</h2>
                    <EditProjectForm project={project} token={auth.token} />
                    <button onClick={handleDelete} color="var(--warningColor)">
                    Delete Project
                    </button>
                </div>
        )}
        </div>
    );
}

export default ProjectPage;
