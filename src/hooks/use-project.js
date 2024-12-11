import { useState, useEffect } from 'react';

import getProject from '../api/get-project';
import getUser from '../api/get-user';

export default function useProject(projectID) {
    const [project, setProject] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchProjectWithUsers = async () => {
            setIsLoading(true);
        try { 
            
            const projectData = await getProject(projectID);

            const uniqueUserID = [
                ...new Set(projectData.pledges.map((pledge) => pledge.supporter)),
            ];

            const users = await Promise.all(
                uniqueUserID.map((id) => getUser(id).catch(() => null))
            );

            const userMap = {};
            users.forEach((user, index) => {
                if (user) {
                    userMap[uniqueUserID[index]] = user.username;
                }
            });

            setProject({...projectData, userMap });
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
