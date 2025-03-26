import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';

/**
 * DragAndDropList is a React component that provides drag-and-drop functionality
 * for reordering a list of items. It uses the `@hello-pangea/dnd` library to handle
 * drag-and-drop interactions.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Array} props.items - An array of items to be displayed and reordered. Each item must have:
 *   - `orderId` (string): A unique identifier for the item.
 *   - `content` (ReactNode): A React component representing the content of the item.
 * @param {Function} props.setItems - A function to update the reordered list of items. It receives the updated array as an argument.
 * @throws {Error} Throws an error if the `items` prop is not provided.
 * @throws {Error} Throws an error if the `setItems` prop is not provided.
 *
 */
export default function DragAndDropList({items, setItems}) {
    if (items == undefined) {
        throw new Error("'items' prop not provided to DragAndDropList component");
    }
    if (setItems == undefined) {
        throw new Error("'setItems prop not provided to DragAndDropList component");
    }

    // console.log('items in draganddroplist', items);

    const handleOnDragEnd = ({source, destination}) => {
        if (!destination || source.index === destination.index) return;

        const reorderedList = items.slice();
        const [removedItem] = reorderedList.splice(source.index, 1);
        reorderedList.splice(destination.index, 0, removedItem);
        setItems(reorderedList);
    };
    // console.log('array on drag and drop list', array);

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-2 py-2"
                    >
                        {items.map((item, index) => {
                            // console.log('item inside draganddroplist', item);
                            return (
                                <Draggable
                                    key={item.orderId}
                                    draggableId={item.orderId}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="rounded-lg p-2 shadow"
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
