import {Checkbox} from '@/components/ui/checkbox';
import {GripVertical} from 'lucide-react';

export default function SidebarItem({name, handleVisibilityChange, visible}) {
    const handleChange = () => {
        handleVisibilityChange(!visible);
    };

    return (
        <li className="my-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        name={name}
                        className="h-6 w-6"
                        checked={visible}
                        onCheckedChange={handleChange}
                    />
                    <label htmlFor={name} className="text-md font-semibold">
                        {name}
                    </label>
                </div>
                <GripVertical />
            </div>
        </li>
    );
}
