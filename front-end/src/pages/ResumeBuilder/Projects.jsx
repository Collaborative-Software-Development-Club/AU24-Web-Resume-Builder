import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Projects({resume, projects}) {
    return (
        <div className="times">
            <SectionTitle title="Projects" />
            <EditableComponent resume={resume} type="projects" data={projects} />
        </div>
    );
}

export default Projects;
