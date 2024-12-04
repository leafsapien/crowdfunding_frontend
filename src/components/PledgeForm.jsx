import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        setErrors({}); // Resets errors on new submit
        
        if (credentials.amount && credentials.anonymous && credentials.comment && projectID) {
            try {

                // Creates the new Pledge and stores back end data in response var
                const response = await postPledge(
                    parseInt(credentials.amount, 10),
                    credentials.anonymous,
                    credentials.comment,
                    projectID
                );
                console.error("Uh oh, looks like we had an issue creating the Pledge at stage 1 of the function", error.message) // DEBUG
                console.log("Pledge created successfully - Next we navigate back to the project page", response)

                // Navigate back to the same project page, which will essentially refresh it with the new pledge
                navigate(`/project/${projectID}`);

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
        <form>
            {error.general && <p style={{ color: 'red' }}>{error.general}</p>}{' '}
            {/* General inline error styling */}
            <div>
                <label htmlFor="title">Donation Amount:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="e.g. $10"
                    value={credentials.amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Do you want this Pledge to appear as Anonymous?:</label>
                <input
                    type="checkbox"
                    id="anonymous"
                    checked={credentials.anonymous} // This is for using the "checked" functionality
                    onChange={(event) =>
                        setCredentials((prevCredentials) => ({
                            ...prevCredentials,
                            anonymous: event.target.checked, // Updates state based on checkbox value
                        }))
                    }
                />
            </div>
            <div>
                <label htmlFor="goal">Your comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Please enter your comment"
                    value={credentials.comment}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Submit your Pledge
            </button>
        </form>
    );
}

export default PledgeForm;
