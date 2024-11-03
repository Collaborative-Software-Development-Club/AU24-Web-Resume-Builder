import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Experiences({resume, experiences}) {
    console.log(experiences);
    return (
        <div className="grid">
            <SectionTitle title="Experience" />
            <EditableComponent resume={resume} type="experience" data={experiences} />
        </div>
    );
}

export default Experiences;
