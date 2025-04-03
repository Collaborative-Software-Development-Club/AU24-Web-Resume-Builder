import Experience from './Experience';
import {SectionOfDraggableItems} from './SectionOfDraggableItems';
import {SectionTitle} from './SectionTitle';

export function Experiences({updateExperience, experiences}) {
    // some experiences may not have ids from the database
    // const experienceWithIds = experiences.map((item, index) => ({experienceId: index, ...item}));

    //set function for DragAndDropList
    const setDragData = (reorderedList) => {
        console.log(reorderedList)
        updateExperience(reorderedList.map((item) => {
           return (item.content.props.children[0].props.experience);
        }))
    }

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
                setDragData={setDragData}
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
