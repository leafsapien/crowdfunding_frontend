import { useState, useEffect } from "react";
import getCurrentUser from "../api/get-current-user";

export default function useCurrentUser(token) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) { 
            setError("Error: No token provided.");
            setIsLoading(false);
            return;
        }

    const fetchCurrentUser = async () => {
        setIsLoading(true);
        try {
            const userData = await getCurrentUser(token);
            setUser(userData);
            setError(null);
        } catch (error) {
            setError(error.message || "Error: Failed to fetch the current user.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchCurrentUser();
    }, [token]);

    return { user, isLoading, error}
}