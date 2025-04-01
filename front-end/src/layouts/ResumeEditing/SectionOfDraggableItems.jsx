import {PopupSideButton} from '@/components/PopupSideButton';
import DragAndDropList from './DragAndDropList';
import {X} from 'lucide-react';
import {Plus} from 'lucide-react';

export function SectionOfDraggableItems({renderItem, itemData, setItemData, createNewItem}) {
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
                setItems={setItemData}
            />
        </div>
    );
}
