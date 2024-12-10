async function getUser(userID) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userID}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const fallbackError = `Error fetching User with id ${userID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        throw new Error(data?.detail || fallbackError);
    }

    return await response.json();
}

export default getUser;
