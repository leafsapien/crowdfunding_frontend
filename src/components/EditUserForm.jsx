import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import updateUser from '../api/put-user';
import postLogin from '../api/post-login'; //The login api is used for token authentication once details are edited

function EditUserForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth(); //This accesses the setAuth from useAuth hook

    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const [errors, setErrors] = useState(''); // For displaying error messages

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Resets errors on new submit
        if (
            credentials.first_name &&
            credentials.last_name &&
            credentials.email &&
            credentials.password
        ) {
            try {
                // Creates the new user
                await updateUser(
                    credentials.first_name,
                    credentials.last_name,
                    credentials.email,
                    credentials.password
                );

                // Stores the token locally and updates auth state
                window.localStorage.setItem('token', loginResponse.token);
                setAuth({ token: loginResponse.token });

                // Navigate to the home page
                navigate('/');
            } catch (error) {
                console.error('Updating User details failed: ', error.message);

                // Parse backend validation errors
                if (error.message.includes('email')) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: 'That email is already registered against another account.'
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: error.message
                    }));
                }
            }
        }
    };

    return (
        <form>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}{' '}
            {/* General error */}
            <div>
                <label htmlFor="first_name">First name:</label>
                <input
                    type="text"
                    id="first_name"
                    placeholder="Update your first name"
                    value={credentials.first_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="last_name">Last name:</label>
                <input
                    type="text"
                    id="last_name"
                    placeholder="Update your surname"
                    value={credentials.last_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Update your email address"
                    value={credentials.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>} {/* Email error */}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Update your password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>
            <button type="Update details" onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    );
}

export default EditUserForm;
