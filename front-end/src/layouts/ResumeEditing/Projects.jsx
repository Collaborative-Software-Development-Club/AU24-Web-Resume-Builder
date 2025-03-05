import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Projects({updateProjects, projects}) {
    return (
        <div className="times">
            <SectionTitle title="Projects" />
            <EditableComponent updateComponent={updateProjects} type="projects" data={projects} />
        </div>
    );
}

export default Projects;
