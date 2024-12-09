async function getPledges(pledgeID) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = `Error fetching pledges list`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
}

export default getPledges;
