import {MONTHS} from '@/constants/months';

export function MonthDisplayView({monthNumber}) {
    const monthName = MONTHS.find((monthInfo) => monthInfo.value == monthNumber);
    return (
        <div className="flex h-9 items-center justify-between whitespace-nowrap px-1">
            <p>{monthName?.name ?? ''}</p>
        </div>
    );
}
