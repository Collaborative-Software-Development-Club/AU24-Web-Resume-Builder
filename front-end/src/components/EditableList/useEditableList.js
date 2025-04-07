const EMPTY_STRING = '';

export function useEditableList(list, setList) {
    const editableList = list.map((element, index) => ({
        value: element,
        id: index,
    }));
    function handleChange(value, id) {
        const newList = editableList.map((element) => {
            if (element.id === id) {
                return value;
            }
            return element.value;
        });
        setList(newList);
        updateList(newList.map((item) => item.value));
    }
    function addNew() {
        setList([...list, EMPTY_STRING]);
    }
    function remove(id) {
        setList(
            editableList.filter((element) => element.id !== id).map((element) => element.value),
        );
    }
    function removeEmpty() {
        const newList = list.filter((element) => element.value !== EMPTY_STRING);
        setList(newList);
    }
    return {
        handleChange,
        addNew,
        editableList,
        remove,
        removeEmpty,
    };
}
