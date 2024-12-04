async function postPledge(amount, anonymous, comment, projectID) {
    const url = `${import.meta.env.VITE_API_URL}/project/`;
    const response = await fetch(url, {
        method: 'POST', // This describes the API method in which we are sending data to the back end
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            amount: amount,
            anonymous: anonymous,
            comment: comment,
            projectID,
        })
    });

    if (!response.ok) {
        // Parse the backend error response
        const data = await response.json().catch(() => {
            throw new Error('Error trying to create new Pledge');
        });

        console.error('Backend response error: ', data); //Log the error response in console

        // Fallback for other errors
        const fallbackError = data?.detail ?? 'Error trying to create a Pledge';
        throw new Error(fallbackError);
    }
    return await response.json();
}

export default postPledge;
