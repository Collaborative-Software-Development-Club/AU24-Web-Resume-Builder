import {useState, useRef, useEffect} from 'react';
export function SectionEditing({displayView, editingView, empty}) {
    const [isEditing, setIsEditing] = useState(empty);
    return isEditing || empty ? (
        <EditView closeEditing={() => setIsEditing(false)}>{editingView}</EditView>
    ) : (
        <div onClick={() => setIsEditing(true)}>{displayView}</div>
    );
}

function EditView({children, closeEditing}) {
    const divRef = useRef(null);
    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
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
