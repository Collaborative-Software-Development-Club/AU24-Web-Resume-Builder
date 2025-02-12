import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';

export default function DragAndDropList({array, setArray}) {
    console.log(array);

    const handleOnDragEnd = ({source, destination}) => {
        if (!destination || source.index === destination.index) return;

        const reorderedList = array?.slice();
        const [removedItem] = reorderedList.splice(source.index, 1);
        reorderedList.splice(destination.index, 0, removedItem);
        setArray(reorderedList);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2 py-2">
                        {array.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="rounded-lg p-2 shadow">
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
