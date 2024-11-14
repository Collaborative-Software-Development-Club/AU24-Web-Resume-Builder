import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {Trash2, Plus} from 'lucide-react';
import {useState} from 'react';
import DragAndDropList from './DragAndDropList';
import {PopupSideButton} from '@/components/PopupSideButton';

// Helper function to create new items with a unique ID
const createNewItem = (id, type) => {
    const base = {
        id: id.toString(),
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
    const [array, setArray] = useState(data?.items?.map((item, index) => ({...item, id: index.toString()})) || []);
    const [nextId, setNextId] = useState(data?.items?.length || 0);

    const isExperience = type === 'experience';

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(nextId, type);
        const updatedArray = [...array, newItem];
        setArray(updatedArray);
        updateComponent(updatedArray);
        setNextId((prevId) => prevId + 1);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        const updatedArray = array.filter((item) => item.id !== id);
        setArray(updatedArray);
        updateComponent(updatedArray);
    };

    // Passed in setter for array, preserving items marked as invisible
    const setArrayWithVisibility = (newArray) => {
        const invisibleItems = array.filter((item) => !item.visible);
        const updatedArray = [...newArray, ...invisibleItems];
        setArray(updatedArray);
        updateComponent(updatedArray);
    };

    // Update an item in the array
    const editArray = (updatedItem) => {
        const updatedArray = array.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        setArray(updatedArray);
        updateComponent(updatedArray);
    };

    return (
        <div className="times flex flex-col gap-6">
            <DragAndDropList
                array={array
                    .filter((item) => item.visible)
                    .map((item) => ({
                        ...item,
                        content: (
                            <div key={item.id} className="group relative flex items-center px-4 transition duration-300 hover:bg-gray-200 hover:shadow-lg">
                                {isExperience ? <Experience setItems={editArray} experience={item} /> : <Project setItems={editArray} project={item} />}
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
