import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

export default function DragAndDropList({resume, array, setArray}) {
    // Handle drag end event
    const handleOnDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination || source.index === destination.index) return;

        const reorderedArray = Array.from(array);
        const [movedItem] = reorderedArray.splice(source.index, 1);
        reorderedArray.splice(destination.index, 0, movedItem);

        setArray(reorderedArray);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sections">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-2 p-2">
                        {array?.map((item, index) => (
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
