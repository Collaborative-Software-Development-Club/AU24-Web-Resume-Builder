import {SectionTitle} from './SectionTitle';
import {Project} from './Project';
import {SectionOfDraggableItems} from './SectionOfDraggableItems';

export function Projects({updateProjects, projects}) {
    return (
        <>
            <SectionTitle title="Projects" />
            <SectionOfDraggableItems
                renderItem={(data, update) => <Project project={data} updateItems={update} />}
                itemData={projects}
                createNewItem={createNewItem}
                setItemData={updateProjects}
            />
        </>
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
