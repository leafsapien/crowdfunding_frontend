async function deletePledge(pledgeID, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledge/${pledgeID}/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error deleting pledge with ID ${pledgeID}`;

        const data = await response.json().catch(() => {
        throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return true; 
    }

export default deletePledge;