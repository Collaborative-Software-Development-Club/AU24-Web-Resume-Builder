import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MONTHS = new Map([
  ['January', 1],
  ['February', 2],
  ['March', 3],
  ['April', 4],
  ['May', 5],
  ['June', 6],
  ['July', 7],
  ['August', 8],
  ['September', 9],
  ['October', 10],
  ['November', 11],
  ['December', 12],
]);

function getKeyByValue(searchValue) {
  for (let [key, value] of MONTHS.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return null;
}

export default function Months({ type, updateComponent, value }) {
  const handleSelectChange = (month) => {
    const property = `${type}Date`;
    const monthValue = MONTHS.get(month); 

    updateComponent((prev) => ({
      ...prev,
      [property]: {
        ...prev[property],
        month: monthValue,
      },
    }));
  };

  return (
    <Select value={getKeyByValue(value)} onValueChange={handleSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder={`${type} Month`} />
      </SelectTrigger>
      <SelectContent>
        {Array.from(MONTHS.keys()).map((month) => (
          <SelectItem value={month} key={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
