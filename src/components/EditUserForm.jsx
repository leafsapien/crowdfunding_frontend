import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import updateUser from '../api/put-user';

function EditUserForm({ user }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: ''
    });

    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const changedFields = {};
        Object.keys(formData).forEach(key => {
            const value = formData[key]?.trim();
            if (value && value !== user[key]) {
                changedFields[key] = value;
            }
        });

        if (changedFields.password === '') {
            delete changedFields.password;
        }

        if (Object.keys(changedFields).length === 0) {
            setError('No changes made');
            return;
        }

        try {
            await updateUser(user.id, changedFields, auth.token);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/mydetails');
            }, 2000);
        } catch (error) {
            console.error('Update error:', error);
            setError(error.message || 'Error: Failed to update user details');
        }
    };

    return (
        <div className="delete-form-container">
            {showSuccess && (
                <div className="pledge-success-message">
                    User Details Updated Successfully!
                </div>
            )}
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
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">New Password (optional):</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
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

EditUserForm.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired
};

export default EditUserForm;
