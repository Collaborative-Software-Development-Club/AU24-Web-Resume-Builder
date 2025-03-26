import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {X, Plus} from 'lucide-react';
import DragAndDropList from './DragAndDropList';
import {PopupSideButton} from '@/components/PopupSideButton';

export default function EditableComponent({updateComponent, type, data}) {
    console.log('data in EditableComponent', data);
    // we have to create the orderId property for each item in the array
    const sanitizedData = data?.map((item, index) => ({...item, orderId: index.toString()})) || [];
    const isExperience = type === 'experience';

    //Ensure that the IDs are integers when updating resume
    const revertIdsToInt = (array) => {
        return array.map((item) => ({...item, orderId: Number(item.orderId)}));
    };

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(data?.length, type);
        const updatedArray = [...data, newItem];
        console.log('updatedArray in addItem', updatedArray);
        updateComponent(updatedArray);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        console.log('id in removeItem', id);
        const updatedArray = sanitizedData.filter((item) => Number(item.orderId) !== Number(id));
        console.log('sanitizedData in removeItem', sanitizedData);
        console.log('updatedArray in removeItem', updatedArray);
        updateComponent(updatedArray);
    };

    // Passed in setter for array, preserving items marked as invisible
    const setArrayWithVisibility = (newArray) => {
        // const invisibleItems = data?.filter((item) => !item.visible);
        const updatedArray = [...newArray, ...invisibleItems];
        updateComponent(revertIdsToInt(updatedArray));
    };

    // Update an item in the array
    const editItems = (updatedItem) => {
        console.log('updatedItem in editItems', updatedItem);
        // console.log('in editItems');
        const updatedArray = sanitizedData.map((item) => {
            // console.log('editItems: item.id', item.id);
            // console.log('editItems: updatedItem.id', updatedItem.id);
            return item.orderId == updatedItem.orderId ? updatedItem : item;
        });
        console.log('data in editItems', data);
        console.log('updatedArray in editItems', updatedArray);
        updateComponent(revertIdsToInt(updatedArray));
    };
    //TODO fix this stuff with adding content to the item
    return (
        <div className="flex flex-col gap-6">
            <DragAndDropList
                array={sanitizedData
                    // ?.filter((item) => item.visible)
                    .map((item) => ({
                        ...item,
                        content: (
                            <div
                                key={item.orderid}
                                className="group relative flex items-center px-4 transition duration-300 hover:bg-gray-200 hover:shadow-lg"
                            >
                                {isExperience ? (
                                    <Experience
                                        updateItems={editItems}
                                        experience={{...item, content: null}}
                                    />
                                ) : (
                                    <Project updateItems={editItems} project={item} />
                                )}
                                <PopupSideButton
                                    onlyOnHover={true}
                                    onClick={() => removeItem(Number(item.orderId))}
                                    variant="destructive"
                                    className="rounded-full"
                                    // size="icon" // i don't know why it doesnt align on the center with this
                                >
                                    <X />
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

// Helper function to create new items with a unique ID
function createNewItem(id, type) {
    console.log('creating new item');
    const base = {
        orderId: id,
        startDate: {month: 0, year: null},
        endDate: {month: 0, year: null},
        location: '',
    };

    if (type === 'experience') {
        return {...base, position: '', company: '', description: ''};
    } else {
        return {...base, title: '', description: '', technologies: '', link: '', organization: ''};
    }
}
