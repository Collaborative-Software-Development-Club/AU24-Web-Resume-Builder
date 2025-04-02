import {useState, useRef, useEffect, useCallback} from 'react';

export function SectionEditing({displayView, editingView, empty, sectionName}) {
    const [isEditing, setIsEditing] = useState(empty);
    // console.log(`isEditing for ${sectionName} is ${isEditing}`);
    // console.log(`empty for ${sectionName} is ${empty}`);
    const closeEditing = empty ? () => {} : () => setIsEditing(false);
    return isEditing ? (
        <EditView closeEditing={closeEditing} sectionName={sectionName}>
            {editingView}
        </EditView>
    ) : (
        <div onClick={() => setIsEditing(true)} className="w-full">
            {displayView}
        </div>
    );
}

function EditView({children, closeEditing, sectionName}) {
    const divRef = useRef(null);

    const handleClickOutside = useCallback(
        (event) => {
            const target = event.target;

            // Check if click originated from a dialog or toast
            const isDialogClick = target.closest('[role="dialog"]') !== null;
            const isToastClick = target.closest('[role="status"]') !== null;

            if (
                divRef.current &&
                !divRef.current.contains(target) &&
                !(target.getAttribute('role') == 'option') &&
                !isDialogClick &&
                !isToastClick
            ) {
                closeEditing();
            }
        },
        [closeEditing],
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return <div ref={divRef}>{children}</div>;
}
