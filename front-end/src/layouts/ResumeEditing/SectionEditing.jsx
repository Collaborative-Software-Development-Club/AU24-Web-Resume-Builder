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
        <div onClick={() => setIsEditing(true)} className="w-full">{displayView}</div>
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
