async function getCurrentUser(token, userID) {
    const url = `${import.meta.env.VITE_API_URL}/users/me`;

    const response = await fetch(url, { 
        headers: {
            Authorization: `Token ${token}`,
        }, 
    });

    if (!response.ok) {
        const fallbackError = `Error fetching User details with id ${userID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
}

export default getCurrentUser;
