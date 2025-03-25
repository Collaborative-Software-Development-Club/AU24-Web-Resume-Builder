import React from 'react';
import {EditableList} from '@/components/EditableList';

export function ContactMethods({contactMethods, updateContactMethods}) {
    return (
        <EditableList
            list={contactMethods}
            RenderList={({list}) => {
                return (
                    <div className="flex flex-row gap-2 justify-center">
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
        />
    );
}
