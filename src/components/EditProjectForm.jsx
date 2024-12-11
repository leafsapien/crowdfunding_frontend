import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import editProject from '../api/put-project';

function EditProjectForm({ project, token }) {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image,
        isOpen: project.isOpen,
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
            await updateProject(
                credentials.id, setCredentials, token);
                alert("Project updated successfully")
            // Navigate back to my details page
            navigate('/mydetails');
        } catch (error) {
            console.error('Error updating Project details failed: ', error.message);
            }
        }

    return (
        <form>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}{' '}
            {/* General error */}
            <div>
            <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Edit the project title"
                    value={credentials.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Project Details and Description:</label>
                <input
                    type="text"
                    id="description"
                    placeholder="Edit the Project Description"
                    value={credentials.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="goal">Your Financial goal amount:</label>
                <input
                    type="number"
                    id="goal"
                    placeholder="e.g. $1,000"
                    value={credentials.goal}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Update your image:</label>
                {/* Future prospective feature - How to I make this an image upload box to be stored in my own img files?  That way users don't need to provide an image url */}
                <input
                    type="url"
                    // accept="image/*" // Restricts file type to image files only
                    id="image"
                    value={credentials.image}
                    onChange={handleChange}
                />
            </div>
            <button type="Update details" onClick={handleSubmit}>
                Update
            </button>
        </form>
    );
};

export default EditProjectForm;
