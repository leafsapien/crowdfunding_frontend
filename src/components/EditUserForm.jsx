import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useCurrentUser from '../hooks/use-current-user';
import updateUser from '../api/put-user';

function EditUserForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user, isLoading, error: userError } = useCurrentUser(auth?.token);
    
    const [credentials, setCredentials] = useState(null);
    const [error, setError] = useState('');

    // Initialize credentials once user data is loaded
    useEffect(() => {
        if (user) {
            setCredentials({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: ''
            });
        }
    }, [user]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (userError) {
        return <p>{userError}</p>;
    }

    if (!credentials) {
        return <p>Loading user details...</p>;
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Resets errors on new submit

        try {
            await updateUser(user.id, credentials, auth.token);
            alert("User details updated successfully");
            navigate('/mydetails');
        } catch (error) {
            setError('Error updating user details: ' + error.message);
        }
    };

    return (
        <div className="delete-form-container">
            <h1 className="delete-form-title">Edit User Details</h1>
            <form className="delete-form">
                {error && (
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        value={credentials.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={credentials.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password (optional):</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                    />
                </div>

                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Update Details
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUserForm;
