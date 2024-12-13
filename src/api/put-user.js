async function updateUser(userID, userData, token) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userID}/`;

    try {
        // Match the Django User model fields
        const cleanedData = {
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password
        };

        // Remove undefined/empty fields
        Object.keys(cleanedData).forEach(key => {
            if (!cleanedData[key]) {
                delete cleanedData[key];
            }
        });

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(cleanedData),
        });

        if (!response.ok) {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                throw new Error(data.detail || `Failed to update user: ${response.status}`);
            } catch {
                throw new Error(`Server error (${response.status}): ${text.slice(0, 100)}`);
            }
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export default updateUser;