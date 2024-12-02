async function postSignup(first_name, last_name, email, username, password) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
    method: "POST", // This describes the API method in which we are sending data to the back end
    headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password,
        }),
    });

if (!response.ok) {
    const fallbackError = `Error trying to sign up`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });
    console.error("Backend response error: ", data); // Log the error response from backend
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
    }

export default postSignup;