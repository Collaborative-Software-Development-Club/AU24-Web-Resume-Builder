import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Experiences({resume, experiences}) {
    return (
        <div className="mt-4 grid">
            <SectionTitle title="Experiences" />
            <EditableComponent resume={resume} type="Experience" data={experiences} />
        </div>
    );
}

export default Experiences;
