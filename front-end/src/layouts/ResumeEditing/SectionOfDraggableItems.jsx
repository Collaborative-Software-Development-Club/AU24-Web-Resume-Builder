import {PopupSideButton} from '@/components/PopupSideButton';
import DragAndDropList from './DragAndDropList';
import {X} from 'lucide-react';
import {Plus} from 'lucide-react';

/**
 * SectionOfDraggableItems is a React component that renders a list of draggable items
 * with the ability to add, update, and remove items. It also provides a button to add
 * new items and integrates with a drag-and-drop list for reordering.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.renderItem - A function to render each item. It receives the item data
 * and a callback to update the item as arguments.
 * @param {Array} props.itemData - An array of data representing the items to be displayed.
 * @param {Function} props.setItemData - A function to update the state of the item data array.
 * @param {Function} props.createNewItem - A function that generates a new item to be added to the list.
 *
 * @returns {JSX.Element} A component that displays a list of draggable items with add, update, and remove functionality.
 */
export function SectionOfDraggableItems({renderItem, itemData, setItemData, setDragData, createNewItem}) {
    const addItem = () => {
        const updatedArray = [...itemData, createNewItem()];
        setItemData(updatedArray);
    };

    // Remove an item by its ID
    const removeItem = (indexToRemove) => {
        const updatedArray = itemData.toSpliced(indexToRemove, 1);
        setItemData([...updatedArray]);
    };

    const updateItem = (newData, index) => {
        itemData[index] = newData;
        setItemData([...itemData]);
    };

    return (
        <div className="relative flex flex-col gap-6">
            <PopupSideButton
                onlyOnHover={false}
                onClick={addItem}
                variant="secondary"
                className="rounded-full"
            >
                <Plus />
            </PopupSideButton>
            <DragAndDropList
                items={itemData.map((item, index) => ({
                    orderId: index.toString(),
                    content: (
                        <div className="group relative transition duration-300 hover:bg-gray-200 hover:shadow-lg">
                            {renderItem(item, (newData) => updateItem(newData, index))}
                            <PopupSideButton
                                onlyOnHover={true}
                                onClick={() => removeItem(index)}
                                variant="destructive"
                                className="rounded-full"
                                // size="icon" // i don't know why it doesnt align on the center with this
                            >
                                <X />
                            </PopupSideButton>
                        </div>
                    ),
                }))}
                setItems={setDragData}
            />
        </div>
    );
}
