import { useState, useEffect } from 'react';
import getPledge from '../api/get-pledge';

export default function usePledge(pledgeID, projectID) {
    const [pledge, setPledge] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        if (!pledgeID || projectID) return; //Prevents unnecessary calls

        // Here we pass the pledgeID to the getpledge function.
        getPledge(pledgeID, projectID)
            .then((pledge) => {
                setPledge(pledge);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });

        // This time we pass the pledgeID to the dependency array so that the hook will re-run if the pledgeID changes.
    }, [pledgeID, projectID]);

    return { pledge, isLoading, error };
}
