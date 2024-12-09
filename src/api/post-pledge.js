async function postPledge(amount, anonymous, comment, project) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
        method: 'POST', // This describes the API method in which we are sending data to the back end
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            amount: amount,
            anonymous,
            comment: comment,
            project,
        })
    });

    let data;
    try {
        data = await response.json();
        console.log("Post Pledge data: ", data);
    } catch {
            throw new Error('Error trying to create new Pledge');
        };
    if (!response.ok) {
        const fallbackError = data?.detail ?? 'Failed to post a new pledge.  Please try again later.';
        throw new Error(fallbackError);
    }

    return data;
}


export default postPledge;
