import {useState, useRef, useEffect} from 'react';

export function SectionEditing({displayView, editingView, empty, sectionName}) {
    const [isEditing, setIsEditing] = useState(empty);
    return isEditing ? (
        <EditView
            closeEditing={() => {
                // this check if for the situation where the section is initially empty, then the user clicks outside the section, but since it is empty, we want to keep its isEditing status
                // could also be written in another way, but I found this the most intuitive
                if (!empty) {
                    setIsEditing(false);
                }
            }}
            sectionName={sectionName}
        >
            {editingView}
        </EditView>
    ) : (
        <div onClick={() => setIsEditing(true)}>{displayView}</div>
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
            console.log('clicking outside');
            closeEditing();
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return <div ref={divRef}>{children}</div>;
}
