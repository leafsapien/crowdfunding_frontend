async function updatePledge(pledgeID, pledgeData, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledge/${pledgeID}/`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(pledgeData),
    });

    if (!response.ok) {
        const fallbackError = `Error updating pledge with id ${pledgeID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default updatePledge;