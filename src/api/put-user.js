async function updateUser(userID, userData, token) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userID}/`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const fallbackError = `Error updating user with ID ${userID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default updateUser;