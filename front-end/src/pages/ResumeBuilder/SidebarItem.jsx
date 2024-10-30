import {Checkbox} from '@/components/ui/checkbox';
import {GripVertical} from 'lucide-react';
import {useState} from 'react';

const SidebarItem = ({resume, name, elements}) => {
    const [checkbox, setCheckbox] = useState(resume[name.toLowerCase()]?.visible || false);
    const [childCheckboxes, setChildCheckboxes] = useState(
        elements?.reduce((acc, item) => {
            acc[item] = resume[name.toLowerCase()]?.[item.toLowerCase()]?.visible || false;
            return acc;
        }, {}) || {},
    );

    const setVisibility = (component, state) => {
        // Update the parent visibility directly
        if (resume[component]) {
            resume[component].visible = state;
        }
        console.log(resume);
    };

    const setChildVisibility = (component, child, state) => {
        // Update the child visibility directly
        if (resume[component] && resume[component][child]) {
            resume[component][child].visible = state;
        }
        console.log(resume);
    };

    const handleChange = (e) => {
        setCheckbox(e);
        setVisibility(name.toLowerCase(), e);

        // Update all children to match the parent state
        const updatedChildren = {...childCheckboxes};
        Object.keys(updatedChildren).forEach((child) => {
            updatedChildren[child] = e; // Set each child to the same state as the parent
            setChildVisibility(name.toLowerCase(), child.toLowerCase(), e);
        });
        setChildCheckboxes(updatedChildren);
    };

    const handleChildChange = (item, state) => {
        setChildCheckboxes((prev) => ({
            ...prev,
            [item]: state,
        }));
        setChildVisibility(name.toLowerCase(), item.toLowerCase(), state);
    };

    return (
        <li className="my-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox name={name} className="h-4" checked={checkbox} onCheckedChange={handleChange} />
                    <label htmlFor={name} className="grid text-lg">
                        {name}
                    </label>
                </div>
                <GripVertical />
            </div>
            {elements == null ? null : (
                <ul className="cursor-pointer list-none">
                    {elements.map((item) => (
                        <li className="my-2 ml-7" key={item}>
                            <div className="flex items-center space-x-2">
                                <Checkbox name={item} className="h-4" checked={childCheckboxes[item] && checkbox} onCheckedChange={(e) => handleChildChange(item, e)} />
                                <label htmlFor={item} className="grid text-lg">
                                    {item}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarItem;
