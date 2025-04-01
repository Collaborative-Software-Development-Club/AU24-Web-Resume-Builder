import Experience from './Experience';
import {SectionOfDraggableItems} from './SectionOfDraggableItems';
import {SectionTitle} from './SectionTitle';

export function Experiences({updateExperience, experiences}) {
    // some experiences may not have ids from the database
    // const experienceWithIds = experiences.map((item, index) => ({experienceId: index, ...item}));
    return (
        <div className="grid">
            <SectionTitle title="Experience" />
            <SectionOfDraggableItems
                renderItem={(experienceData, update) => (
                    <Experience experience={experienceData} updateItems={update} />
                )}
                itemData={experiences}
                createNewItem={createNewItem}
                setItemData={updateExperience}
            />
        </div>
    );
}

function createNewItem() {
    const base = {
        startDate: {month: 0, year: undefined},
        endDate: {month: 0, year: undefined},
        location: '',
    };
    return {...base, position: '', company: '', description: ''};
}
