import {Input} from '@/components/ui/input';
import Months from './Months';
import {EditOnClick} from '../../components/EditOnClick';
import {BulletPointDisplayView} from './BulletPointDisplayView';
import {MonthDisplayView} from './MonthDisplayView';
import {AITextImprovementInput} from '@/components/AITextImprovementInput';

const PLACEHOLDERS = {
    position: 'Enter your position title',
    company: 'Company or Organization',
    description: 'Brief description of responsibilities',
    startMonth: 'Start Month',
    startYear: 'Start Year',
    endMonth: 'End Month',
    endYear: 'End Year',
    location: 'Location (e.g., City, State)',
};

export function Experience({updateItems, experience}) {
    // Handle input changes for text fields
    const handleInputChange = (e) => {
        console.log(e);
        const {name, value} = e.target;
        updateItems({
            ...experience,
            [name]: value,
        });
    };

    // Handle selection changes for month
    const handleSelectChange = (dateType, field, value) => {
        updateItems({
            ...experience,
            [dateType]: {
                ...experience[dateType],
                [field]: value,
            },
        });
    };

    const isEmpty =
        experience.position === '' && experience.company === '' && experience.description === '';
    return (
        <>
            <EditOnClick
                sectionName="experience"
                empty={isEmpty}
                editingView={
                    <div className="times flex w-full flex-col gap-2">
                        <div className="text-md grid grid-cols-3 justify-between gap-2 font-bold">
                            <Input
                                name="company"
                                value={experience.company}
                                placeholder={PLACEHOLDERS.company}
                                className="col-span-2"
                                onChange={handleInputChange}
                            />
                            <Input
                                name="location"
                                value={experience.location}
                                placeholder={PLACEHOLDERS.location}
                                className="col-span-1 text-right"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="times grid grid-cols-8 gap-2">
                            <Input
                                name="position"
                                value={experience.position}
                                placeholder={PLACEHOLDERS.position}
                                className="col-span-4"
                                onChange={handleInputChange}
                            />
                            {/* Start Date (Month and Year) */}
                            <Months
                                type="Start"
                                handleSelectChange={handleSelectChange}
                                value={experience.startDate.month}
                            />
                            <Input
                                name="startYear"
                                placeholder="Start Year"
                                value={experience.startDate.year}
                                onChange={(e) =>
                                    handleSelectChange('startDate', 'year', e.target.value)
                                }
                            />
                            <Months
                                type="End"
                                handleSelectChange={handleSelectChange}
                                value={experience.endDate.month}
                            />
                            <Input
                                name="endYear"
                                placeholder="End Year"
                                value={experience.endDate.year}
                                onChange={(e) =>
                                    handleSelectChange('endDate', 'year', e.target.value)
                                }
                            />
                        </div>

                        {/* Experience Description */}
                        <div className="w-full">
                            <Input
                                name="description"
                                value={experience.description}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.description}
                                className=""
                            />
                        </div>
                    </div>
                }
                displayView={
                    <div className="times flex w-full flex-col">
                        <div className="flex flex-row justify-between gap-2 font-bold">
                            <p>
                                {experience.company == ''
                                    ? PLACEHOLDERS.company
                                    : experience.company}
                            </p>
                            <p>
                                {experience.location == ''
                                    ? PLACEHOLDERS.location
                                    : experience.location}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>
                                {experience.position == ''
                                    ? PLACEHOLDERS.position
                                    : experience.position}
                            </p>
                            <div className="flew-col flex items-center italic">
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView
                                        monthNumber={experience.startDate.month}
                                        placeHolder={PLACEHOLDERS.startMonth}
                                    />
                                    <p className="times">
                                        {experience.startDate.year ?? PLACEHOLDERS.startYear}
                                    </p>
                                </div>
                                <p className="px-2">-</p>
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView
                                        monthNumber={experience.endDate.month}
                                        placeHolder={PLACEHOLDERS.endMonth}
                                    />
                                    <p className="">
                                        {experience.endDate.year ?? PLACEHOLDERS.endYear}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <BulletPointDisplayView
                            text={experience.description}
                            placeHolder={PLACEHOLDERS.description}
                        />
                    </div>
                }
            />
        </>
    );
}

export default Experience;
