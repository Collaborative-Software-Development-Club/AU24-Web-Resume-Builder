import React from 'react';
import {Dialog, DialogTrigger} from '@/components/ui/dialog';
import {useEditableList} from './useEditableList';
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
 */
export function EditableList({list, RenderList, title, description}) {
    const {editableList, handleChange, addNew, remove} = useEditableList(list);
    return (
        <div className="group relative">
            <RenderList list={editableList.map((element) => element.value)} />
            <Dialog>
                <DialogTrigger asChild>
                    <PopupSideButton onlyOnHover={true}>Edit</PopupSideButton>
                </DialogTrigger>
                <EditModal elements={editableList} handleChange={handleChange} addNew={addNew} remove={remove} title={title} description={description} />
            </Dialog>
        </div>
    );
}
