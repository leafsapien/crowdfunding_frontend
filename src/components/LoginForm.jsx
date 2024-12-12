import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import postLogin from '../api/post-login';
import { useAuth } from '../hooks/use-auth';

function LoginForm() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        if (credentials.username && credentials.password) {
            try {
                const response = await postLogin(credentials.username, credentials.password);
                window.localStorage.setItem('token', response.token);
                setAuth({
                    token: response.token
                });
                navigate('/');
            } catch {
                setError('Invalid username or password');
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h1 className="signup-form-title">Login to Your Account</h1>
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                
                {error && (
                    <div className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                )}
                
                <div className="submit-button-container">
                    <button type="submit" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
