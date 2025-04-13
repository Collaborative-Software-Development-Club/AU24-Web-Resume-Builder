import {useState, useRef, useEffect, useCallback} from 'react';

/**
 * A React component that toggles between a display view and an editing view
 * when clicked. It allows users to edit content inline and handles closing
 * the editing view when clicking outside of it.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.displayView - The content to display when not in editing mode.
 * @param {React.ReactNode} props.editingView - The content to display when in editing mode.
 * @param {boolean} props.empty - A flag indicating whether the section is empty.
 * @param {string} props.sectionName - The name of the section being edited (used for debugging/logging).
 *
 * @throws {Error} Throws an error if `displayView` or `editingView` props are not provided.
 *
 * @returns {JSX.Element} The rendered component.
 */
export function EditOnClick({displayView, editingView, empty, sectionName}) {
    if (displayView == undefined) {
        throw new Error('displayView prop not provided to EditOnClick');
    }
    if (editingView == undefined) {
        throw new Error('editingView prop not provided to EditOnClick');
    }
    const [isEditing, setIsEditing] = useState(empty);

    const closeEditing = empty ? () => {} : () => setIsEditing(false);

    return isEditing ? (
        <EditView closeEditing={closeEditing} sectionName={sectionName}>
            {editingView}
        </EditView>
    ) : (
        <div onClick={() => setIsEditing(true)} tabIndex={0} className="w-full">
            {displayView}
        </div>
    );
}

function EditView({children, closeEditing, sectionName}) {
    const divRef = useRef(null);

    const handleClickOutside = useCallback(
        (event) => {
            const target = event.target;

            const isRadixSelect = target.closest('[data-radix-popper-content-wrapper]');
            const isDialog = target.closest('[role="dialog"]');
            const isToast = target.closest('[role="status"]');

            if (
                divRef.current &&
                !divRef.current.contains(target) &&
                !isRadixSelect &&
                !isDialog &&
                !isToast
            ) {
                closeEditing();
            }
        },
        [closeEditing],
    );

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            console.log('closing');
            closeEditing();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleClickOutside]);

    return <div ref={divRef}>{children}</div>;
}
