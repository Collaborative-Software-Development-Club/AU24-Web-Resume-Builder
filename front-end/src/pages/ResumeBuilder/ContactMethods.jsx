import React from 'react';
import {EditableList} from '@/components/EditableList';

export function ContactMethods({contactMethods}) {
    return (
        <EditableList
            list={contactMethods}
            RenderList={({list}) => {
                console.log(list);
                return (
                    <div className="flex flex-row gap-2 self-center">
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
        />
    );
}
