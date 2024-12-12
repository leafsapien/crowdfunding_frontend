import { useState } from 'react';

const DeleteRequestForm = () => {
    const [deleteType, setDeleteType] = useState('Delete Pledge');
    const [requestDetails, setRequestDetails] = useState('');
    const [deleteUrl, setDeleteUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailSubject = 'Delete Request';
        const emailBody = `
        Delete Request:
        Type: ${deleteType}
        Details: ${requestDetails}
        URL: ${deleteUrl}
        `;
        const emailAddress = 'anaya.basak@gmail.com';
        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
            emailSubject
        )}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="delete-form-container">
            <h1 className="delete-form-title">Delete Request Form</h1>
            <form className="delete-form">
                <div className="form-group">
                    <label htmlFor="deleteType">Delete Type:</label>
                    <select
                        id="deleteType"
                        value={deleteType}
                        onChange={(e) => setDeleteType(e.target.value)}
                    >
                        <option value="Delete Pledge">Delete Pledge</option>
                        <option value="Delete Project">Delete Project</option>
                        <option value="Delete User Account">Delete User Account</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="requestDetails">Request Details:</label>
                    <textarea
                        id="requestDetails"
                        value={requestDetails}
                        onChange={(e) => setRequestDetails(e.target.value)}
                        rows={4}
                        placeholder="Please provide details about your delete request"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deleteUrl">URL:</label>
                    <input
                        type="text"
                        id="deleteUrl"
                        value={deleteUrl}
                        onChange={(e) => setDeleteUrl(e.target.value)}
                        placeholder="Enter the URL of the item to delete"
                    />
                </div>

                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Submit Delete Request
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeleteRequestForm;