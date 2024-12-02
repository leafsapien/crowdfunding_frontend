import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

import postSignup from "../api/post-signup";
import postLogin from "../api/post-login"; //The login api is used for token authentication once user is successfully created

function SignupForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth(); //This accesses the setAuth from useAuth hook

    const [credentials, setCredentials] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            credentials.first_name && 
            credentials.last_name && 
            credentials.email && 
            credentials.username && 
            credentials.password
            ) {
                try {
                    // Creates the new user
                    await postSignup(
                        credentials.first_name,
                        credentials.last_name,
                        credentials.email,
                        credentials.username,
                        credentials.password
                        ); 
                    
                    // Logs the user in
                    const loginResponse = await postLogin (
                        credentials.username,
                        credentials.password
                    );

                    // Stores the token locally and updates auth state
                    window.localStorage.setItem("token", loginResponse.token);
                    setAuth({ token: loginResponse.token });

                    // Navigate to the home page
                    navigate("/");
                    }
                catch (error) {
                    console.error("Sign up failed: ", error.message);
                    alert(error.message); // Displays the error to the user
                    }
            }
        };

        return (
        <form>
        <div>
            <label htmlFor="first_name">First name:</label>
            <input 
            type="text" 
            id="first_name" 
            placeholder="Your first name" 
            value={credentials.first_name}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="last_name">Last name:</label>
            <input 
            type="text" 
            id="last_name" 
            placeholder="Your surname" 
            value={credentials.last_name}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input 
            type="email" 
            id="email" 
            placeholder="Your email address" 
            value={credentials.email}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            id="username" 
            placeholder="Choose your username" 
            value={credentials.username}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            id="password" 
            placeholder="Create your password" 
            value={credentials.password}
            onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Sign Up
        </button>
        </form>
    );
};

export default SignupForm;