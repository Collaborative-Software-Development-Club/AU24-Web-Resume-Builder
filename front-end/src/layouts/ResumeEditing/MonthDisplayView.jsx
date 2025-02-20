import {MONTHS} from '@/constants/months';

export function MonthDisplayView({monthNumber}) {
    const monthName = MONTHS.find((monthInfo) => monthInfo.value == monthNumber);
    return <p className="times">{monthName?.name || ''}</p>;
}
