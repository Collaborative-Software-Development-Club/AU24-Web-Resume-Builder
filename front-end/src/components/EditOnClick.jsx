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
    const handleClickOutside = (event) => {
        if (
            divRef.current &&
            !divRef.current.contains(event.target) &&
            !(event.target.getAttribute('role') == 'option')
        ) {
            // console.log('clicking outside');
            closeEditing();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeEditing]);
    return <div ref={divRef}>{children}</div>;
}
