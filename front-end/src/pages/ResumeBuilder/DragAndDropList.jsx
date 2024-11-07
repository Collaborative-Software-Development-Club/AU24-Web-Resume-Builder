import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';

export default function DragAndDropList({ array, setArray }) {
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = array.findIndex(item => item.id === active.id);
            const newIndex = array.findIndex(item => item.id === over.id);
            setArray(arrayMove(array, oldIndex, newIndex));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={array} strategy={rectSortingStrategy}>
                <div className="flex flex-col gap-2 py-2">
                    {array.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                            <div className="rounded-lg p-2 shadow">{item.content}</div>
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

// Create a SortableItem component for each sortable item
function SortableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}
