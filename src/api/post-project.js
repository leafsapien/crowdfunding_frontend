async function postProject(title, description, goal, image) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
        method: 'POST', // This describes the API method in which we are sending data to the back end
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title: title,
            description: description,
            goal: goal,
            image: image,
            is_open: true
        })
    });

    if (!response.ok) {
        // Parse the backend error response
        const data = await response.json().catch(() => {
            throw new Error('Error trying to create new Project');
        });

        console.error('Backend response error: ', data); //Log the error response in console

        // Extract specific field missing errors to return to the user - Only image error is working.  Need to review and possibly make general "required information is missing" error
        const errorMessages = [];
            if (data.title) errorMessages.push("Title is required.");
            if (data.description) errorMessages.push("Description is required.");
            if (data.goal) errorMessages.push("Goal amount is required.");
            if (data.image) errorMessages.push("An image is required.");
        
        console.error('Backend response error: ', data); //Log the error response in console DEBUG
        
        // If there any multiple fields missing, throw them combined
        if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(' '));
        }

        // Fallback for other errors
        const fallbackError = data?.detail ?? 'Error trying to create a new Project';
        throw new Error(fallbackError);
    }
    return await response.json();
}

export default postProject;
