import {EditableList} from '@/components/EditableList';

export function ContactMethods({contactMethods, updateContactMethods}) {
    console.log('contact methods: ', contactMethods);
    return (
        <EditableList
            list={contactMethods}
            RenderList={({list}) => {
                return (
                    <div className="flex flex-row justify-center gap-2">
                        {list.map((element) => (
                            <p className="times underline" key={element}>
                                {element}
                            </p>
                        ))}
                    </div>
                );
            }}
            title="Conctact Methods"
            description="Edit contact methods"
            updateList={updateContactMethods}
            buttonText={contactMethods.length == 0 ? 'Add Contact Methods' : 'Edit'}
        />
    );
}
