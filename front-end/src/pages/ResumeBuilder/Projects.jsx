import {SectionTitle} from './SectionTitle';
import {Project} from './Project';

export function Projects({projects}) {
    return (
        <div className="times mt-6">
            <SectionTitle title="Projects" />
            <div className="flex flex-col gap-8">
                {projects.items.map((project) => (
                    <Project key={project.title} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;
