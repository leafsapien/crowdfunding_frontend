import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import updateUser from '../api/put-user';

function EditUserForm({ user, token }) {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
    });

    const [errors, setErrors] = useState(''); // For displaying error messages

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrors({}); // Resets errors on new submit
        

        try {
            await updateUser(
                credentials.id, setCredentials, token);
                alert("User details updated successfully")
            // Navigate back to my details page
            navigate('/mydetails');
        } catch (error) {
            console.error('Error: User details update has failed: ', error.message);
            }
        }

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
                Update
            </button>
        </form>
    );
};

EditUserForm.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    token: PropTypes.string.isRequired
};

export default EditUserForm;
