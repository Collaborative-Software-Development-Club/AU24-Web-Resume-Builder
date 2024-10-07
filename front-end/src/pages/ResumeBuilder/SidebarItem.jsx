import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const SidebarItem = ({name, elements}) => {
    const [checkbox, setCheckbox] = useState(true);
    const [childCheckbox, setChildCheckbox] = useState(true);
    const handleChange = (e) => {
        setCheckbox(e.target.checked);
        setChildCheckbox(e.target.checked);

        setVisibility(name);
    };
    const handleChildChange = (e) => {
        setChildCheckbox(e.target.checked);
    };

    //still needs to implement functionality
    const setVisibility = (component) => {};
    return (
        <li className="my-2">
            <Label className="times grid grid-cols-4 text-lg">
                <Input type="checkbox" className="h-6" defaultChecked="true" onChange={handleChange} />
                {name}
            </Label>
            {elements == null ? (
                ''
            ) : (
                <ul style={{cursor: 'pointer', listStyleType: 'none'}}>
                    {elements.map((item) => (
                        <li className="my-2 ml-7" key="item">
                            <Label className="times flex text-base">
                                <Input type="checkbox" className="h-5 basis-1/4" checked={childCheckbox} onChange={handleChildChange} />
                                {item}
                            </Label>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarItem;
