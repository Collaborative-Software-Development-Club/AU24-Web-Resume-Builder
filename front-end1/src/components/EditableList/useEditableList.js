import {useState} from 'react';

const EMPTY_STRING = '';

export function useEditableList(list) {
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
        console.log(newList);
        setEditableList(newList);
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
