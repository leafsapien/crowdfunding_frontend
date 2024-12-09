import { useState, useEffect } from 'react';
import getPledge from '../api/get-pledge';
import getPledges from '../api/get-pledges';

export default function usePledges() {
    const [pledges, setPledges] = useState();
    const [pledgeIsLoading, setIsLoading] = useState(true);
    const [pledgeError, setError] = useState();

    useEffect(() => {
        // Here we pass the pledgesID to the getpledges function.
        getPledges()
            .then((pledges) => {
                setPledges(pledges);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });

    }, []);

    return { pledges, pledgeIsLoading, pledgeError };
}
