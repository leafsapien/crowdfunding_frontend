import { useState, useEffect } from 'react';

import getProject from '../api/get-project';

import getPledge from '../api/get-pledge';

export default function useProject(projectID) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchProjectWithUsers = async () => {
            setIsLoading(true);
        try { 
            
            const projectData = await getProject(projectID);

            const uniquePledgeID = [
                ...new Set(projectData.pledges.map(pledge => pledge.id)),
            ];

            const pledges = await Promise.all(
                uniquePledgeID.map((id) => getPledge(id).catch(() => null))
            );

            const pledgeMap = {};
            pledges.forEach((pledge, index) => {
                if (pledge) {
                    pledgeMap[uniquePledgeID[index]] = pledge.supporter.username;
                }
            });

            setProject({...projectData, pledgeMap });
            setIsLoading(false);

            } catch(error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchProjectWithUsers();

    }, [projectID]);

    return { project, isLoading, error };
}
