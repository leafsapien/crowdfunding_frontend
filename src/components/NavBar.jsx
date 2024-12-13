import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';
import Footer from './Footer';

function NavBar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = () => {
        // Clear the token from localStorage
        window.localStorage.removeItem('token');
        
        // Clear the auth context
        setAuth({ token: null });

        // Show logout message
        setLogoutMessage('Successfully logged out!');

        // Clear the message after 3 seconds
        setTimeout(() => {
            setLogoutMessage('');
        }, 3000);

        // Navigate to home page
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="logo">Harvezt Cirkle</Link>
                {logoutMessage && (
                    <div className="logout-message">
                        {logoutMessage}
                    </div>
                )}
                {auth.token ? (
                    // Show these links if user is authenticated
                    <>
                        <Link to="/mydetails">My Details</Link>
                        <Link to="/project/new">Create Project</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    // Show these links if user is not authenticated
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </nav>
            <div className="content-wrapper">
                <Outlet />
            </div>
            <Footer year={new Date().getFullYear()} />
        </div>
    );
}

export default NavBar;
