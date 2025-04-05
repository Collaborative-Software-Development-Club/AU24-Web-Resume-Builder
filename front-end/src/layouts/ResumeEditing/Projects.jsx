import {SectionTitle} from './SectionTitle';
import {Project} from './Project';
import {SectionOfDraggableItems} from './SectionOfDraggableItems';

export function Projects({updateProjects, projects}) {

    //set function for DragAndDropList
    const setDragData = (reorderedList) => {
        console.log(reorderedList)
        updateProjects(reorderedList.map((item) => {
           return (item.content.props.children[0].props.project);
        }))
    }

    return (
        <div>
            <SectionTitle title="Projects" />
            {/* <EditableComponent updateComponent={updateProjects} type="projects" data={projects} /> */}
            <SectionOfDraggableItems
                renderItem={(data, update) => <Project project={data} updateItems={update} />}
                itemData={projects}
                createNewItem={createNewItem}
                setItemData={updateProjects}
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
    return {...base, title: '', description: '', technologies: '', link: '', organization: ''};
}
