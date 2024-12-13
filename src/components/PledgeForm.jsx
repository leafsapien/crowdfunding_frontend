import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import postPledge from '../api/post-pledge';

function PledgeForm({ projectID }) {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        amount: '',
        anonymous: false,
        comment: '',
    });

    const [error, setErrors] = useState(''); // For displaying error messages

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;

        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: type == `checkbox` ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors('');
        
        if (credentials.amount && credentials.comment && projectID) {
            try {
                const response = await postPledge(
                    parseInt(credentials.amount, 10),
                    credentials.anonymous,
                    credentials.comment,
                    projectID
                );
                console.log("Status of function: Pledge created successfully - Next we navigate back to the project page", response)
                setCredentials({
                    amount: '',
                    anonymous: false,
                    comment: '',
                });

                // First navigate to the project page
                navigate(`/project/${projectID}`);
                // Then refresh after a brief delay
                setTimeout(() => {
                    navigate(0);  // This will refresh the current page
                }, 100);

            } catch (error) {
                console.error('Pledge creation failed: ', error.message);

                // Set backend validation errors
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: error.message || 'An unexpected error occurred.'
                }));
            }
        } else {

            setErrors((prevErrors) => ({
                ...prevErrors,
                general: error.message || 'An unexpected error occurred'
            }));
        }
    };

    return (
        <form className="pledge-form">
            <div className="form-group">
                <label htmlFor="amount">Donation Amount:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="e.g. $10"
                    value={credentials.amount}
                    onChange={handleChange}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="anonymous">Make Anonymous:</label>
                <input
                    type="checkbox"
                    id="anonymous"
                    checked={credentials.anonymous}
                    onChange={handleChange}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="comment">Your Comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Enter your comment"
                    value={credentials.comment}
                    onChange={handleChange}
                />
            </div>

            <div className="submit-button-container">
                <button type="submit" onClick={handleSubmit}>
                    Submit Pledge
                </button>
            </div>
        </form>
    );
}

PledgeForm.propTypes = {
    projectID: PropTypes.number.isRequired
};

export default PledgeForm;
