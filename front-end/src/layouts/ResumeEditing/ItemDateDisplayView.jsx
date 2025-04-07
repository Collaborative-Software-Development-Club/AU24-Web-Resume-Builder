import {MonthDisplayView} from './MonthDisplayView';

export function ItemDateDisplayView({startDate, endDate}) {
    return (
        <div className="flew-col flex items-center italic">
            <div className="flew-col flex items-center">
                <MonthDisplayView monthNumber={startDate.month} />
                <p className="times">{startDate.year || ''}</p>
            </div>
            <p className="px-2">{startDate.year ? '-' : ''}</p>
            {startDate.year && !endDate.year && !endDate.month ? (
                <p>Present</p>
            ) : (
                <div className="flew-col flex items-center">
                    <MonthDisplayView monthNumber={endDate.month} />
                    <p className="">{endDate.year || ''}</p>
                </div>
            )}
        </div>
    );
}
