import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Projects({projects}) {
    return (
        <div className="times">
            <SectionTitle title="Projects" />
            <EditableComponent type="Project" data={projects} />
        </div>
    );
}

export default Projects;
