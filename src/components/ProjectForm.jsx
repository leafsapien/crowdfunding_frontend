import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

import postProject from "../api/post-project";
import postLogin from "../api/post-login"; //The login api is used for token authentication once user is successfully created

function ProjectForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth(); //This accesses the setAuth from useAuth hook

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        is_open: "",
        date_created: "",
    });

    const [errors, setErrors] = useState(""); // For displaying error messages

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Resets errors on new submit
        
        const utcDateCreated = new Date().toISOString(); // Generates UTC timestamp
        const projectData = {
            ...credentials,
            date_created: utcDateCreated, // Automatically sets date_created as at form submission date
            is_open: true, // Automatically sets project is_open to true
        }

    if (
        credentials.title && 
        credentials.description && 
        credentials.goal && 
        credentials.image && 
        credentials.date_created
        ) {
            try {
                // Creates the new project and stores back end data in response var
                const response = await postProject( 
                    credentials.title,
                    credentials.description,
                    credentials.goal,
                    credentials.image,
                    credentials.date_created
                    ); 

                // Navigate to the newly created project page by obtaining id from response var
                const projectID = response.id;
                navigate(`/projects/${projectID}`);
                }
            catch (error) {
                console.error("Project creation failed: ", error.message);

                // Parse backend validation errors
                const validationErrors = JSON.parse(error.message);
                setErrors(validationErrors);
                };
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: error.message,
                    }));
                    }
            }
        };

        return (
        <form>
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>} {/* General inline error styling */}
        <div>
            <label htmlFor="title">Project Title:</label>
            <input 
            type="text"
            id="title" 
            placeholder="Your project title" 
            value={credentials.title}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="description">Project Details and Description:</label>
            <input 
            type="textarea" 
            id="description" 
            placeholder="Please provide all the details of your Project including location, story, and the outcome you'd like to see when you reach your funding goal." 
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
            <label htmlFor="image">Please upload your image:</label>  
            {/* Future prospective feature - How to I make this an image upload box to be stored in my own img files?  That way users don't need to provide an image url */}
            <input 
            type="url" 
            // accept="image/*" // Restricts file type to image files only
            id="image" 
            value={credentials.image}
            onChange={handleChange}
            />
        </div>

        <button type="submit" onClick={handleSubmit}>
            Submit your New Project
        </button>
        </form>
    );

export default ProjectForm;