import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import updatePledge from '../api/put-pledge';

function EdiPledgeForm({ pledge, token }) {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        amount: pledge.amount,
        comment: pledge.comment,
        anonymous: pledge.anonymous
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
            await updatePledge(
                credentials.id, setCredentials, token);
                alert("Pledge updated successfully")
            // Navigate back to my details page
            navigate('/mydetails');
        } catch (error) {
            console.error('Error: Update to Pledge details failed: ', error.message);
            }
        }

    return (
        <form>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}{' '}
            {/* General error */}
            <div>
            <label htmlFor="title">Edit Donation Amount:</label>
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
                <label htmlFor="goal">Edit your comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Please enter your comment"
                    value={credentials.comment}
                    onChange={handleChange}
                />
            </div>
            <button type="Update details" onClick={handleSubmit}>
                Update
            </button>
        </form>
    );
};

export default EditPledgeForm;
