import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';
import Footer from './Footer';

function NavBar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [logoutMessage, setLogoutMessage] = useState('');

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setAuth({ token: null });
        setLogoutMessage('Successfully logged out!');
        setTimeout(() => {
            setLogoutMessage('');
        }, 3000);
        navigate('/');
    };

    return (
        <div>
            <div className="logo-banner">
                <img src="/img/logo_HC.png" alt="Harvezt Cirkle Logo" />
            </div>
            <nav className="navbar">
                <Link to="/">Home</Link>
                {logoutMessage && (
                    <div className="logout-message">
                        {logoutMessage}
                    </div>
                )}
                {auth.token ? (
                    <>
                        <Link to="/mydetails">My Details</Link>
                        <Link to="/project/new">Create Project</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
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
