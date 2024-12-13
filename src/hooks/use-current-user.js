import { useState, useEffect } from "react";
import getCurrentUser from "../api/get-current-user";

export default function useCurrentUser(token) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser(token);
                setUser(userData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return { user, isLoading, error };
}