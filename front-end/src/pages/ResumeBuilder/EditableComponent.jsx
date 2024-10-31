import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {Trash2, Plus} from 'lucide-react';
import {useState, useEffect} from 'react';
import DragAndDropList from './DragAndDropList';
import {PopupSideButton} from '@/components/PopupSideButton';

// Helper functions to create new items with a unique ID
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

export default function EditableComponent({resume, type, data}) {
    const [array, setArray] = useState([]);
    const [nextId, setNextId] = useState(0);

    // Initialize the array with visible items from data
    useEffect(() => {
        if (data && data.items) {
            setArray(data.items.map((item, index) => ({...item, id: index.toString()})));
            setNextId(data.items.length);
        }
    }, [data]);

    const isExperience = type === 'experience';

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(nextId, type);
        setArray((prevArray) => [...prevArray, newItem]);
        resume[type.toLowerCase()].items = array;
        console.log(resume);
        setNextId((prevId) => prevId + 1);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        setArray((prevArray) => prevArray.filter((item) => item.id !== id));
        resume[type.toLowerCase()].items = array;
        console.log(resume);
    };

    // Passed in setter for array
    const setArrayWithVisibility = (newArray) => {
        const invisibleItems = array.filter(item => !item.visible);
        setArray([...newArray, ...invisibleItems]);
    };

    return (
        <div className="times flex flex-col gap-6">
            <DragAndDropList
                resume={resume}
                array={array
                    .filter((item) => item.visible)
                    .map((item) => ({
                        ...item,
                        content: (
                            <div key={item.id} className="group relative flex items-center px-4 transition duration-300 hover:bg-gray-200 hover:shadow-lg">
                                {isExperience ? <Experience experience={item} /> : <Project project={item} />}
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
