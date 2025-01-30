import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const MONTHS = [
    {name: 'January', value: 1},
    {name: 'February', value: 2},
    {name: 'March', value: 3},
    {name: 'April', value: 4},
    {name: 'May', value: 5},
    {name: 'June', value: 6},
    {name: 'July', value: 7},
    {name: 'August', value: 8},
    {name: 'September', value: 9},
    {name: 'October', value: 10},
    {name: 'November', value: 11},
    {name: 'December', value: 12},
];

export default function Months({type, handleSelectChange, value}) {
    const newHandleSelectChange = (month) => {
        const monthValue = MONTHS.find((m) => m.name === month);
        handleSelectChange(type.toLowerCase()+"Date", 'month',  Number(monthValue.value));
    };

    return (
        <div className="times">
            <Select value={MONTHS.find((m) => m.value === value)?.name} onValueChange={newHandleSelectChange}>
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
