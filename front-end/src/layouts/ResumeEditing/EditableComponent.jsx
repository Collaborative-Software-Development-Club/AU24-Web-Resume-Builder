import {Project} from './Project';
import Experience from './Experience';
import {Button} from '@/components/ui/button';
import {X, Plus} from 'lucide-react';
import DragAndDropList from './DragAndDropList';
import {PopupSideButton} from '@/components/PopupSideButton';

export default function EditableComponent({updateComponent, type, data}) {
    // console.log('data in EditableComponent', data);
    // we have to create the orderId property for each item in the array
    const sanitizedData = data.map((item, index) => ({
        ...item,
        orderId: item.orderId ?? 'item' + index.toString(),
    }));

    const isExperience = type === 'experience';

    // Add a new item to the list
    const addItem = () => {
        const newItem = createNewItem(data.length, type);
        const updatedArray = [...data, newItem];
        updateComponent(updatedArray);
    };

    // Remove an item by its ID
    const removeItem = (id) => {
        const updatedArray = data.filter((item) => Number(item.orderId) !== Number(id));
        updateComponent([...updatedArray]);
    };

    const setArray = (newArray) => {
        /* the extra information that is in newArray from drag and drop isn't the same as the original array,
        so we ƒind the corresponding items in the original array */
        const reorderedArray = newArray.map((itemFromDragAndDrop) =>
            sanitizedData.find(
                (originalItem) => originalItem.orderId == itemFromDragAndDrop.orderId,
            ),
        );
        updateComponent(reorderedArray);
    };

    // Update an item in the array
    const editItems = (updatedItem) => {
        const updatedArray = sanitizedData.map((item) => {
            return item.orderId == updatedItem.orderId ? updatedItem : item;
        });
        updateComponent(updatedArray);
    };
    //TODO fix this stuff with adding content to the item
    return (
        <div className="flex flex-col gap-6">
            <DragAndDropList
                items={sanitizedData.map((item) => ({
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
                setItems={setArray}
            />
            <Button className="mx-auto" onClick={addItem}>
                <Plus />
            </Button>
        </div>
    );
}

// Helper function to create new items with a unique ID
function createNewItem(id, type) {
    const base = {
        orderId: id,
        startDate: {month: 0, year: 0},
        endDate: {month: 0, year: 0},
        location: '',
    };

    if (type === 'experience') {
        return {...base, position: '', company: '', description: ''};
    } else {
        return {...base, title: '', description: '', technologies: '', link: ''};
    }
}
