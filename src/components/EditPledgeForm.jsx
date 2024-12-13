import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import updatePledge from '../api/put-pledge';

function EditPledgeForm({ pledge }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    
    const [formData, setFormData] = useState({
        amount: pledge.amount,
        comment: pledge.comment,
        anonymous: pledge.anonymous
    });

    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const changedFields = {};
        Object.keys(formData).forEach(key => {
            if (formData[key] !== pledge[key]) {
                changedFields[key] = formData[key];
            }
        });

        if (Object.keys(changedFields).length === 0) {
            setError('No changes made');
            return;
        }

        try {
            await updatePledge(pledge.id, changedFields, auth.token);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                const projectId = typeof pledge.project === 'number' 
                    ? pledge.project 
                    : pledge.project.id;
                navigate(`/project/${projectId}`);
            }, 2000);
        } catch (error) {
            console.error('Update error:', error);
            setError(error.message || 'Error: Failed to update pledge');
        }
    };

    return (
        <div className="delete-form-container">
            {showSuccess && (
                <div className="pledge-success-message">
                    Pledge Edited Successfully!
                </div>
            )}
            <h1 className="delete-form-title">Edit Pledge</h1>
            <form className="delete-form">
                {error && (
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="text"
                        id="comment"
                        value={formData.comment}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="anonymous">Make Anonymous:</label>
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={handleChange}
                    />
                </div>

                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Update Pledge
                    </button>
                </div>
            </form>
        </div>
    );
}

EditPledgeForm.propTypes = {
    pledge: PropTypes.shape({
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        anonymous: PropTypes.bool.isRequired,
        project: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                id: PropTypes.number.isRequired
            })
        ]).isRequired
    }).isRequired
};

export default EditPledgeForm;
