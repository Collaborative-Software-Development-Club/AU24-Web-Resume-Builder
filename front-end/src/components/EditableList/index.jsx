import React from 'react';
import {Dialog, DialogTrigger} from '@/components/ui/dialog';
import {useEditableList} from '../../hooks/useEditableList';
import {EditModal} from './EditModal';
import {PopupSideButton} from '../PopupSideButton';

/**
 * A component that renders an editable list with a modal for editing and adding new items.
 *
 * @component
 * @param {Object} props - The properties that define the EditableList component.
 * @param {Array<string>} props.list - The initial list of items to be displayed and edited.
 * @param {React.ComponentType<{list: Array<string>}>} props.RenderList - A component that renders the list of items.
 *        This component should accept a `list` prop of type Array<string>.
 * @param {string} [props.buttonText="Edit"] - The text to display on the button that triggers the edit modal.
 */
export function EditableList({
    list,
    renderList,
    title,
    description,
    updateList,
    buttonText = 'Edit',
}) {
    const {editableList, handleChange, addNew, remove} = useEditableList(list, updateList);
    console.log('editableList', editableList);

    return (
        <div className="group relative">
            {renderList(editableList.map((element) => element.value))}
            <Dialog>
                <DialogTrigger asChild>
                    <PopupSideButton
                        onlyOnHover={list.length == 0 ? false : true}
                        variant="secondary"
                    >
                        {buttonText}
                    </PopupSideButton>
                </DialogTrigger>
                <EditModal
                    elements={editableList}
                    handleChange={handleChange}
                    addNew={addNew}
                    remove={remove}
                    title={title}
                    description={description}
                />
            </Dialog>
        </div>
    );
}
