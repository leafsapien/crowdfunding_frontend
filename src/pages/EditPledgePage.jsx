import { useParams } from 'react-router-dom';
import EditPledgeForm from '../components/EditPledgeForm';
import { useAuth } from '../hooks/use-auth';
import usePledge from '../hooks/use-pledge';

function EditPledgePage() {
    const { id } = useParams();
    const { auth } = useAuth();
    const { pledge, isLoading, error } = usePledge(id);

    if (!id) {
        return <p>Error: No pledge ID provided</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!pledge) {
        return <p>Error: Pledge not found</p>;
    }

    return <EditPledgeForm pledge={pledge} />;
}

export default EditPledgePage;
