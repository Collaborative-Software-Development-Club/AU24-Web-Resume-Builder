import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Experiences({updateExperience, experiences}) {
    console.log(experiences);
    return (
        <div className="grid">
            <SectionTitle title="Experience" />
            <EditableComponent updateComponent={updateExperience} type="experience" data={experiences} />
        </div>
    );
}

export default Experiences;
