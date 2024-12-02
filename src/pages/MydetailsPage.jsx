//Place holder TBD//

//FUTURE CODE BLOCKS//

//This obtains the token from the user when logged in - Need to add conditional if token exists, if no token redirect to please log in or sign up
// const token = window.localStorage.getItem("token")

// //This sends the token auth through with the request if permissions require it - such as user details page!  Needs error handling.
// const response = await fetch(url, {
//     method: "POST", 
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${token}`
//     },
//     body: JSON.stringify({
//         YOUR_DATA_HERE
//     }),
//     });


//draft code end

import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
            <div>
            <h2>{project.title}</h2>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Status: ${project.is_open}`}</h3>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                        console.log("Found PledgeData: ", pledgeData)
                        return (
                            <li key={key}>
                                {pledgeData?.amount} from {pledgeData?.supporter}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

export default ProjectPage