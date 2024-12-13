async function updatePledge(pledgeId, pledgeData, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(pledgeData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || `Failed to update pledge: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Pledge update error:', error);
        throw error;
    }
}

export default updatePledge;