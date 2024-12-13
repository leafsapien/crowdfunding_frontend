import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import useCurrentUser from '../hooks/use-current-user';
import { useAuth } from '../hooks/use-auth';

function EditUserPage() {
    const { id } = useParams();
    const { auth } = useAuth();
    const { user, isLoading, error } = useCurrentUser(auth?.token);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return <EditUserForm user={user} />;
}

export default EditUserPage;
