
async function editProject(projectID, projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/project/${projectID}/`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(projectData),
    });

    if (!response.ok) {
        const fallbackError = `Error updating project with id ${projectID}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default editProject;