import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import usePledge from '../hooks/use-pledge';
import EditProjectPage from './EditProjectPage';
import useCurrentUser from '../hooks/use-current-user';

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    const { pledge } = usePledge(id);
    const { auth } = useAuth();
    const { user } = useCurrentUser(auth.token);

    const navigate = useNavigate();

    if (isLoading ) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const pledges = project.pledges;
    const owner = project.owner; 
    const isOwner = (owner == user?.id) || false;

    function totalGoal (pledges) {

        const totalGoal = pledges.reduce((sum, pledge) => {
            return sum + (pledge.amount || 0);
        }, 0);
        return totalGoal;
    }

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>
                Created at: {new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
                }).format(new Date(project.date_created))}
            </h3>
            <h3>{`Status: ${project.is_open ? 'Open' : 'Closed'}`}</h3>
            <img src={project.image} />
            <p>{project.description}</p>
            <h4>Project Funding Goal: ${project.goal}</h4>
            <h4>Current Goal Status: ${totalGoal(pledges)}</h4>

            <h3>Pledges:</h3>
                <ul>
                {project.pledges.map((pledge, key) => (
                        <li key={key}>
                            <div className="pledge-card">
                            <h3>
                                {pledge.anonymous 
                                ? 'Anonymous' 
                                : `${project.pledgeMap[String(pledge.id)]}` || 'Unknown Supporter'}
                            </h3>
                            <p> {pledge.comment || 'No comment'} </p>
                            <p>Amount: ${pledge.amount || '0'} </p>
                        </div>
                        </li>
                    ))}
                    
                </ul>
            
            {project.is_open && auth.token ?  (
                <div>
                <h3>Make a Pledge</h3>
                <PledgeForm projectID={project.id} />
                </div>
            ) : null }

            {project.is_open && !auth.token ? (
            <button onClick={navigate("/LoginPage")}>Log In to add a Pledge</button>) : null }

            {!project.is_open ? (<p>This project is closed for pledges.</p>) : null }

            {/* {isOwner ? (
                <div>
                    <h2>Manage Project</h2>
                    <EditProjectPage project={project} token={auth.token} />
                    <button onClick={handleDelete} color="var(--warningColor)">
                    Delete Project
                    </button>
                </div>
        ) : null } */}
        </div>
    );
}

export default ProjectPage;
