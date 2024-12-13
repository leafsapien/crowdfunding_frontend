async function deleteProject(projectID, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectID}/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    if (!response.ok) {
        const fallbackError = `Error deleting project with ID ${projectID}`;

        const data = await response.json().catch(() => {
        throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return true; 
    }

export default deleteProject;