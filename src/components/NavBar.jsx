import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
        };

    return (
        <div>
        <nav>
            <Link to="/">Home</Link>
            {!auth.token ? ( //If user is not logged in
            <>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </>
            ) : ( // If User is logged in
            <>
                <Link to="/mydetails">My Details</Link>
                <Link to="/" onClick={handleLogout}>
                    Log Out
                </Link>
            </>
            )}
        </nav>
        <Outlet />
        </div>
    );
    }

export default NavBar;