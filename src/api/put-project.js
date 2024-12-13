async function editProject(projectId, projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(projectData)
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || `Failed to update project: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Project update error:', error);
        throw error;
    }
}

export default editProject;