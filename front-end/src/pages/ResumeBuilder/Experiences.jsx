import {SectionTitle} from './SectionTitle';
import EditableComponent from './EditableComponent';

export function Experiences({experiences}) {
    return (
        <div className="mt-6 grid">
            <SectionTitle title="Experiences" />
            <EditableComponent type="Experience" data={experiences} />
        </div>
    );
}

export default Experiences;
