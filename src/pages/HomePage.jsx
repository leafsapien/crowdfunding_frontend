import useProjects from '../hooks/use-projects';
import ProjectCard from '../components/ProjectCard';
import gardenImage from '../assets/img/com_garden.webp';
import './style.css';

function HomePage() {
    const { projects } = useProjects();

    return (
        <div className="page-container">
            <div className="welcome-section">
                <div className="welcome-content">
                    <div className="welcome-text">
                        <p>Harvezt Cirkle is a crowdfunding platform dedicated to transforming urban spaces into thriving, sustainable edible gardens. From small balcony projects to large community orchards, we connect passionate gardeners with supporters eager to back initiatives that promote food security, environmental sustainability, and communal sharing.</p>
                        <p>Our mission is to empower individuals and communities to create spaces that provide fresh produce while fostering collaboration and generosity. Whether starting a new garden or expanding an existing one, Harvezt Cirkle helps bring projects to life by bridging the gap between visionaries and contributors.</p>
                        <p>Together, we’re building greener, healthier communities where every harvest is shared, and every garden strengthens the bonds of connection. Join us in supporting a world where urban gardening transforms lives and neighborhoods, one project at a time.</p>
                    </div>
                    <div className="welcome-image">
                        <img src={gardenImage} alt="Community Garden" />
                    </div>
                </div>
            </div>
            
            <h2 className="section-title">Our Projects</h2>
            
            <div id="project-list">
                {projects.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                })}
            </div>
        </div>
    );
}

export default HomePage;
