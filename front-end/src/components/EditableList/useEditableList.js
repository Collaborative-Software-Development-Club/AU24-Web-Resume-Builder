import {useState} from 'react';

const EMPTY_STRING = '';

export function useEditableList(list, updateList) {
    const [editableList, setEditableList] = useState(
        list.map((element, index) => ({
            value: element,
            id: index,
        })),
    );
    const count = editableList.length;
    function handleChange(value, id) {
        const newList = editableList.map((element) => {
            if (element.id === id) {
                return {
                    value: value,
                    id: id,
                };
            }
            return element;
        });
        setEditableList(newList);
        updateList(newList.map((item) => item.value));
    }
    function addNew() {
        setEditableList([...editableList, {value: EMPTY_STRING, id: count}]);
    }
    function remove(id) {
        setEditableList(editableList.filter((element) => element.id !== id));
    }
    return {
        handleChange,
        addNew,
        editableList,
        remove,
    };
}
