
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
    // Parse the backend error response
    const data = await response.json().catch(() => {
        throw new Error("Error trying to sign up");
    });

    console.error("Backend response error: ", data); //Log the error response in console

    // Extract specific validation errors
    if (data.username) {
        throw new Error("That username already exists, please choose another");
        }
    if (data.email) {
        throw new Error("That email address is already registered, please log in");
        }
    
    // Fallback for other errors
    const fallbackError = data?.detail ?? "Error trying to sign up";
    throw new Error(fallbackError);
    }
    return await response.json();
}

export default postSignup;