import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {Trash2, Plus} from 'lucide-react';
import {useState, useEffect} from 'react';

const createNewExperience = (id) => ({
    id: id,
    position: '',
    company: '',
    description: '',
    startDate: {
        month: '',
        year: '',
    },
    endDate: {
        month: '',
        year: '',
    },
    location: '',
    visible: 'true',
});

const createNewProject = (id) => ({
    id: id,
    description: '',
    title: '',
    technologies: '',
    link: '',
    startDate: {
        month: '',
        year: '',
    },
    endDate: {
        month: '',
        year: '',
    },
    location: '',
    visible: 'true',
});

export default function EditableComponent({type, data}) {
    const [array, setArray] = useState([]);
    const [nextId, setNextId] = useState(0);

    // Update array when data changes
    useEffect(() => {
        if (data && data.items) {
            const visibleItems = data.items.filter((item) => item.visible).map((item, index) => ({...item, id: index}));
            setArray(visibleItems);
            setNextId(visibleItems.length);
            console.log('Updating state with visible items:', visibleItems);
        }
    }, [data]);

    const isExp = type === 'Experience';

    // Function to add a new experience or project
    const addExperience = () => {
        const newItem = isExp ? createNewExperience(nextId) : createNewProject(nextId);
        setArray([...array, newItem]);
        setNextId(nextId + 1);
    };

    // Function to remove an experience or project
    const removeExperience = (id) => {
        setArray(array.filter((item) => item.id !== id));
    };

    return (
        <div className="times flex flex-col gap-8">
            {array.map((item) => (
                <div key={item.id} className="group flex items-center transition duration-300 hover:bg-gray-200 hover:shadow-lg">
                    {isExp ? <Experience experience={item} /> : <Project project={item} />}
                    <Button className="mb-1 ml-4 hidden group-hover:block" onClick={() => removeExperience(item.id)}>
                        <Trash2 />
                    </Button>
                </div>
            ))}
            <Button className="mx-auto" onClick={addExperience}>
                <Plus />
            </Button>
        </div>
    );
}
