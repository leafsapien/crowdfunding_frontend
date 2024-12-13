import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth';
import editProject from '../api/put-project';

function EditProjectForm({ project }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    
    const [formData, setFormData] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image,
        is_open: project.is_open
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
            const value = formData[key]?.toString().trim();
            if (value && value !== project[key]?.toString()) {
                changedFields[key] = value;
            }
        });

        if (Object.keys(changedFields).length === 0) {
            setError('No changes made');
            return;
        }

        try {
            await editProject(project.id, changedFields, auth.token);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate(`/project/${project.id}`);
            }, 2000);
        } catch (error) {
            console.error('Update error:', error);
            setError(error.message || 'Error: Failed to update project');
        }
    };

    return (
        <div className="delete-form-container">
            {showSuccess && (
                <div className="pledge-success-message">
                    Project Updated Successfully!
                </div>
            )}
            <h1 className="delete-form-title">Edit Project</h1>
            <form className="delete-form">
                {error && (
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                )}
                
                <div className="form-group">
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="goal">Goal Amount:</label>
                    <input
                        type="number"
                        id="goal"
                        value={formData.goal}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="is_open">Project Status:</label>
                    <select
                        id="is_open"
                        value={formData.is_open}
                        onChange={(e) => {
                            // Convert the string value to boolean
                            const value = e.target.value === 'true';
                            setFormData(prev => ({
                                ...prev,
                                is_open: value
                            }));
                        }}
                    >
                        <option value="true">Open</option>
                        <option value="false">Closed</option>
                    </select>
                </div>

                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    );
}

EditProjectForm.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        goal: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        is_open: PropTypes.bool.isRequired
    }).isRequired
};

export default EditProjectForm;
