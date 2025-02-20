import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {MONTHS} from '@/constants/months';

export default function Months({type, handleSelectChange, value}) {
    const newHandleSelectChange = (month) => {
        const monthValue = MONTHS.find((m) => m.name === month);
        handleSelectChange(type.toLowerCase() + 'Date', 'month', Number(monthValue.value));
    };

    return (
        <div className="times">
            <Select
                value={MONTHS.find((m) => m.value === value)?.name}
                onValueChange={newHandleSelectChange}
            >
                <SelectTrigger>
                    <SelectValue placeholder={`${type} Month`} />
                </SelectTrigger>
                <SelectContent>
                    {MONTHS.map((month) => (
                        <SelectItem value={month.name} key={month.name}>
                            {month.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
