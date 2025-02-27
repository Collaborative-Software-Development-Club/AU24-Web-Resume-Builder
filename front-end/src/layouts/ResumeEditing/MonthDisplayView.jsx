import {MONTHS} from '@/constants/months';
import {CaretSortIcon} from '@radix-ui/react-icons';

export function MonthDisplayView({monthNumber, placeHolder}) {
    const monthName = MONTHS.find((monthInfo) => monthInfo.value == monthNumber);
    return (
        <div className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
            <p className="times">{monthName?.name  ??  placeHolder}</p>
            <CaretSortIcon className="h-4 w-4 opacity-50" />
        </div>
    );
}
