import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import postSignup from '../api/post-signup';
import postLogin from '../api/post-login'; //The login api is used for token authentication once user is successfully created

function SignupForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth(); //This accesses the setAuth from useAuth hook

    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState(''); // For displaying error messages

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Resets errors on new submit
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
                const loginResponse = await postLogin(credentials.username, credentials.password);

                // Stores the token locally and updates auth state
                window.localStorage.setItem('token', loginResponse.token);
                setAuth({ token: loginResponse.token });

                // Navigate to the home page
                navigate('/');
            } catch (error) {
                console.error('Sign up failed: ', error.message);

                // Parse backend validation errors
                if (error.message.includes('username')) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        username: 'That username is already taken, please choose another.'
                    }));
                } else if (error.message.includes('email')) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'That email is already registered, please log in.'
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        general: error.message
                    }));
                }
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h1 className="signup-form-title">Create Your Account</h1>
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="Your first name"
                        value={credentials.first_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Your surname"
                        value={credentials.last_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Choose your username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create your password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                {errors && (
                    <div className="error-container">
                        <p className="error-message">
                            {errors.general || errors.username || errors.email}
                        </p>
                    </div>
                )}
                
                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
