import {useState, useRef, useEffect} from 'react';
export function SectionEditing({displayView, editingView, empty}) {
    const [isEditing, setIsEditing] = useState(empty);
    const divRef = useRef(null);
    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setIsEditing(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return isEditing || empty ? (
        <div ref={divRef}>{editingView}</div>
    ) : (
        <div onClick={() => setIsEditing(true)}>{displayView}</div>
    );
}
