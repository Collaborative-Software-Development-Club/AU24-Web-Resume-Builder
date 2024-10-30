import { Project } from './Project';
import Experience from './Experience';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import DragAndDropList from './DragAndDropList';
import { PopupSideButton } from '@/components/PopupSideButton';

// Helper functions to create new items with a unique ID
const createNewItem = (id, type) => {
    const base = {
        id: id.toString(),
        startDate: { month: '', year: '' },
        endDate: { month: '', year: '' },
        location: '',
        visible: true,
    };
    
    if (type === 'Experience') {
        return { ...base, position: '', company: '', description: '' };
    } else {
        return { ...base, title: '', description: '', technologies: '', link: '' };
    }
};

export default function EditableComponent({ resume, type, data }) {
    const [array, setArray] = useState([]);
    const [nextId, setNextId] = useState(0);

    // Initialize the array with visible items from data
    useEffect(() => {
        if (data && data.items) {
            const visibleItems = data.items
                .filter(item => item.visible)
                .map((item, index) => ({ ...item, id: index.toString() }));
            setArray(visibleItems);
            setNextId(visibleItems.length);
        }
    }, [data]);

    const isExperience = type === 'Experience';

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(nextId, type);
        setArray(prevArray => [...prevArray, newItem]);
        setNextId(prevId => prevId + 1);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        setArray(prevArray => prevArray.filter(item => item.id !== id));
    };

    return (
        <div className="times flex flex-col gap-8">
            <DragAndDropList
                resume={resume}
                array={array.map(item => ({
                    ...item,
                    content: (
                        <div key={item.id} className="group relative flex items-center transition duration-300 hover:bg-gray-200 hover:shadow-lg px-4">
                            {isExperience ? <Experience experience={item} /> : <Project project={item} />}
                            <PopupSideButton onlyOnHover={true} onClick={() => removeItem(item.id)}>
                                <Trash2 />
                            </PopupSideButton>
                        </div>
                    ),
                }))}
                setArray={setArray}
            />
            <Button className="mx-auto" onClick={addItem}>
                <Plus />
            </Button>
        </div>
    );
}
