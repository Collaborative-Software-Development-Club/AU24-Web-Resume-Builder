import {Checkbox} from '@/components/ui/checkbox';
import {useState} from 'react';

const SidebarItem = ({name, elements}) => {
    const [checkbox, setCheckbox] = useState(true);

    const handleChange = (e) => {
        setCheckbox(e);
        setVisibility(name);
    };

    //still needs to implement functionality
    const setVisibility = (component) => {};
    return (
        <li className="my-2">
            <div className="flex items-center space-x-2">
                <Checkbox name={name} className="h-4" checked={checkbox} onCheckedChange={handleChange} />
                <label htmlFor="terms" className="times grid-cols-43 grid text-lg">
                    {name}
                </label>
            </div>
            {elements == null ? (
                ''
            ) : (
                <ul className="cursor-pointer list-none">
                    {elements.map((item) => {
                        const [childCheckbox, setChildCheckbox] = useState(true);

                        const handleChildChange = (e) => {
                            setChildCheckbox(e);
                            setVisibility(item);
                        };

                        return (
                            <li className="my-2 ml-7" key={item}>
                                <div className="flex items-center space-x-2">
                                    <Checkbox name={item} className="h-4" checked={childCheckbox && checkbox} onCheckedChange={handleChildChange} />
                                    <label htmlFor="terms" className="times grid grid-cols-4 text-lg">
                                        {item}
                                    </label>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
};

export default SidebarItem;
