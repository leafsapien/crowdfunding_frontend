import { useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';
import PledgeForm from '../components/PledgeForm';

function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Status: ${project.is_open ? 'Open' : 'Closed'}`}</h3>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    console.log('Found PledgeData: ', pledgeData);
                    return (
                        <li key={key}>
                            {pledgeData?.amount} from {' '}
                            {pledgeData?.anonymous ? 'Anonymous' : pledgeData?.supporter}
                        </li>
                    );
                })}
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
