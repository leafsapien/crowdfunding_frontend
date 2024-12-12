import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `project/${projectData.id}`;

    return (
        <div className="project-card">
            <Link to={projectLink}>
                <img src={projectData.image} />
                <h3>{projectData.title}</h3>
            </Link>
        </div>
    );
}

ProjectCard.propTypes = {
    projectData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default ProjectCard;
