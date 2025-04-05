import {useState, useRef, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

export function EditOnClick({displayView, editingView, empty, sectionName}) {
    if (displayView == undefined) {
        throw new Error('displayView prop not provided to EditOnClick');
    }
    if (editingView == undefined) {
        throw new Error('editingView prop not provided to EditOnClick');
    }

    const [isEditing, setIsEditing] = useState(empty);

    // Sync `isEditing` with `empty` prop changes
    useEffect(() => {
        if (empty) setIsEditing(true);
    }, [empty]);

    const closeEditing = () => setIsEditing(false);

    return isEditing ? (
        <EditView closeEditing={closeEditing} sectionName={sectionName}>
            {editingView}
        </EditView>
    ) : (
        <div onClick={() => setIsEditing(true)} role="button" tabIndex={0} className="w-full">
            {displayView}
        </div>
    );
}

EditOnClick.propTypes = {
    displayView: PropTypes.node.isRequired,
    editingView: PropTypes.node.isRequired,
    empty: PropTypes.bool,
    sectionName: PropTypes.string,
};

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
                console.log('closing');
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
