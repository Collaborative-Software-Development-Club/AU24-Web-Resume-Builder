import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {Trash2, Plus} from 'lucide-react';
import DragAndDropList from './DragAndDropList';
import {PopupSideButton} from '@/components/PopupSideButton';

// Helper function to create new items with a unique ID
const createNewItem = (id, type) => {
    const base = {
        id: id,
        startDate: {month: '', year: ''},
        endDate: {month: '', year: ''},
        location: '',
        visible: true,
    };

    if (type === 'experience') {
        return {...base, position: '', company: '', description: ''};
    } else {
        return {...base, title: '', description: '', technologies: '', link: ''};
    }
};

export default function EditableComponent({updateComponent, type, data}) {
    const sanitizedData = data?.map((item) => ({...item, id: item.id.toString()})) || [];
    const isExperience = type === 'experience';

    //Ensure that the IDs are integers when updating resume
    const revertIdsToInt = (array) => {
        return array.map((item) => ({...item, id: Number(item.id)}));
    };

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(data?.length, type);
        const updatedArray = [...data, newItem];
        updateComponent(updatedArray);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        const updatedArray = data?.filter((item) => item.id !== id);
        updateComponent(updatedArray);
    };

    // Passed in setter for array, preserving items marked as invisible
    const setArrayWithVisibility = (newArray) => {
        const invisibleItems = data?.filter((item) => !item.visible);
        const updatedArray = [...newArray, ...invisibleItems];
        updateComponent(revertIdsToInt(updatedArray));
    };

    // Update an item in the array
    const editItems = (updatedItem) => {
        console.log(updatedItem);
        const updatedArray = data.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        updateComponent(revertIdsToInt(updatedArray));
    };

    return (
        <div className="times flex flex-col gap-6">
            <DragAndDropList
                array={sanitizedData
                    ?.filter((item) => item.visible)
                    .map((item) => ({
                        ...item,
                        content: (
                            <div key={item.id} className="group relative flex items-center px-4 transition duration-300 hover:bg-gray-200 hover:shadow-lg">
                                {isExperience ? <Experience updateItems={editItems} experience={item} /> : <Project updateItems={editItems} project={item} />}
                                <PopupSideButton onlyOnHover={true} onClick={() => removeItem(item.id)}>
                                    <Trash2 />
                                </PopupSideButton>
                            </div>
                        ),
                    }))}
                setArray={setArrayWithVisibility}
            />
            <Button className="mx-auto" onClick={addItem}>
                <Plus />
            </Button>
        </div>
    );
}
