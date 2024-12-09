import { useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';
import PledgeCard from '../components/PledgeCard';
import usePledges from '../hooks/use-pledges';

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
    // const { pledges, pledgeIsLoading, pledgeError } = usePledges();

    

    if (isLoading ) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    // if (pledgeError) {
    //     return <p>Pledges error: {pledgeError.message} </p>
    // }

    const pledges = project.pledges;

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Status: ${project.is_open ? 'Open' : 'Closed'}`}</h3>

            <h3>Pledges:</h3>
                <ul>
                    {pledges.map((pledge) => (
                        <li key={pledge.id}>
                            <PledgeCard pledgeData={pledge} />
                        </li>
                    ))}
                </ul>
            
            {project.is_open && (
                <>
                <h3>Make a Pledge</h3>
                <PledgeForm projectID={project.id} />
                </>
            )}
            {!project.is_open && <p>This project is closed for pledges.</p>}
        </div>
    );
}

export default ProjectPage;
