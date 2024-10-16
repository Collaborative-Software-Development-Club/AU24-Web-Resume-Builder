import {SectionTitle} from './SectionTitle';
import {Experience} from './Experience';

export function Experiences({experiences}) {
    return (
        <div className="times mt-6 mb-6"> {/* Added mb-6 for margin-bottom */}
            <SectionTitle title="Experiences" />
            <div className="flex flex-col gap-8">
                {experiences.items
                    .filter((experience) => experience.visible) // Only show visible experiences
                    .map((experience) => (
                        <Experience key={experience.position} experience={experience} />
                    ))}
            </div>
        </div>
    );
}

export default Experiences;