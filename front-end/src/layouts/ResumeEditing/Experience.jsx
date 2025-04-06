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
    startYear: 'Start Year',
    endYear: 'End Year',
    location: 'Location (e.g., City, State)',
};

export function Experience({updateItems, experience}) {
    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        updateItems({
            ...experience,
            [name]: value,
        });
    };

    // Handle selection changes for dates
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
                    <div className="flex w-full flex-col gap-2">
                        <div className="times text-md grid grid-cols-3 justify-between gap-2 font-bold">
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
                                handleSelectChange={(value) =>
                                    handleSelectChange('startDate', 'month', value)
                                }
                                value={experience.startDate.month}
                            />
                            <Input
                                name="startYear"
                                type="number"
                                inputMode="numeric"
                                placeholder={PLACEHOLDERS.startYear}
                                value={experience.startDate.year}
                                onChange={(e) =>
                                    handleSelectChange('startDate', 'year', Number(e.target.value))
                                }
                                className="[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <Months
                                type="End"
                                handleSelectChange={(value) =>
                                    handleSelectChange('endDate', 'month', value)
                                }
                                value={experience.endDate.month}
                            />
                            <Input
                                name="endYear"
                                type="number"
                                inputMode="numeric"
                                placeholder={PLACEHOLDERS.endYear}
                                value={experience.endDate.year}
                                onChange={(e) =>
                                    handleSelectChange('endDate', 'year', Number(e.target.value))
                                }
                                className="[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </div>

                        {/* Experience Description */}
                        <div className="w-full">
                            <AITextImprovementInput
                                name="description"
                                value={experience.description}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.description}
                            />
                        </div>
                    </div>
                }
                displayView={
                    <div className="times flex w-full flex-col">
                        <div className="flex flex-row justify-between gap-2 font-bold">
                            <p>{experience.company}</p>
                            <p>{experience.location}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>{experience.position}</p>
                            <div className="flew-col flex items-center italic">
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView monthNumber={experience.startDate.month} />
                                    <p className="times">{experience.startDate.year || ''}</p>
                                </div>
                                <p className="px-2">
                                    {experience.startDate.year && experience.endDate.year
                                        ? '-'
                                        : ''}
                                </p>
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView monthNumber={experience.endDate.month} />
                                    <p className="">{experience.endDate.year || ''}</p>
                                </div>
                            </div>
                        </div>
                        <BulletPointDisplayView text={experience.description} />
                    </div>
                }
            />
        </>
    );
}

export default Experience;
