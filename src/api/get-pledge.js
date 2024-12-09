async function getPledge(pledgeID, projectID) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeID}/projects/${projectID}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = `Error fetching pledge with id ${pledgeID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
}

export default getPledge;
