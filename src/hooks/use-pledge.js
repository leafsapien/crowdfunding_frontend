import { useState, useEffect } from 'react';
import getPledge from '../api/get-pledge';

export default function usePledge(pledgeID) {
    const [pledge, setpledge] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Here we pass the pledgeID to the getpledge function.
        getpledge(pledgeID)
            .then((pledge) => {
                setpledge(pledge);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });

        // This time we pass the pledgeID to the dependency array so that the hook will re-run if the pledgeID changes.
    }, [pledgeID]);

    return { pledge, isLoading, error };
}
