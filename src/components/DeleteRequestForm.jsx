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
        <div className="delete-request-form">
        <h1>Delete Request Form</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Delete Type:
            <select value={deleteType} onChange={(e) => setDeleteType(e.target.value)}>
                <option value="Delete Pledge">Delete Pledge</option>
                <option value="Delete Project">Delete Project</option>
                <option value="Delete User Account">Delete User Account</option>
            </select>
            </label>
            <label>
            Request Details:
            <textarea
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
                rows={4}
            />
            </label>
            <label>
            URL:
            <input
                type="text"
                value={deleteUrl}
                onChange={(e) => setDeleteUrl(e.target.value)}
            />
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default DeleteRequestForm;