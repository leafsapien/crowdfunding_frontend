import { useParams } from 'react-router-dom';
import EditProjectForm from '../components/EditProjectForm';
import useProject from '../hooks/use-project';

function EditProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return <EditProjectForm project={project} />;
}

export default EditProjectPage;
