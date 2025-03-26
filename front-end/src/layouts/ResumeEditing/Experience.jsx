import {useState} from 'react';
import {DEFAULT_RESUME} from '@/lib/DEFAULT_RESUME';
import {Input} from '@/components/ui/input';
import Months from './Months';
import {SectionEditing} from './SectionEditing';
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

//Remove the usestate, update handle functions, and add Month component
export function Experience({updateItems, experience}) {
    const [experienceData, setExperienceData] = useState({
        orderId: experience?.orderId,
        position: experience?.position || '',
        company: experience?.company || '',
        description: experience?.description || '',
        location: experience?.location || '',
        startDate: {
            month: experience?.startDate?.month,
            year: experience?.startDate?.year,
        },
        endDate: {
            month: experience?.endDate?.month,
            year: experience?.endDate?.year,
        },
    });
    // console.log(`experienceData`, experienceData);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newExperienceData = {
            ...experienceData,
            [name]: value,
        };
        console.log('newExperienceData', newExperienceData);
        setExperienceData(newExperienceData);
        updateItems(newExperienceData);
    };

    // Handle selection changes for month
    const handleSelectChange = (dateType, field, value) => {
        const updatedData = {
            ...experienceData,
            [dateType]: {
                ...experienceData[dateType],
                [field]: value,
            },
        };
        setExperienceData(updatedData);
        updateItems(updatedData);
    };
    // console.log(JSON.stringify(education));
    // console.log(JSON.stringify(DEFAULT_RESUME.education.content));
    const isEmpty =
        experience.position === '' && experience.company === '' && experience.description === '';
    return (
        <>
            <SectionEditing
                sectionName="experience"
                empty={isEmpty}
                editingView={
                    <div className="times flex w-full flex-col gap-2">
                        <div className="text-md grid grid-cols-3 justify-between gap-2 font-bold">
                            <Input
                                name="company"
                                value={experienceData.company}
                                placeholder={PLACEHOLDERS.company}
                                className="col-span-2"
                                onChange={handleInputChange}
                            />
                            <Input
                                name="location"
                                value={experienceData.location}
                                placeholder={PLACEHOLDERS.location}
                                className="col-span-1 text-right"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="times grid grid-cols-8 gap-2">
                            <Input
                                name="position"
                                value={experienceData.position}
                                placeholder={PLACEHOLDERS.position}
                                className="col-span-4"
                                onChange={handleInputChange}
                            />
                            {/* Start Date (Month and Year) */}
                            <Months
                                type="Start"
                                handleSelectChange={handleSelectChange}
                                value={experienceData.startDate.month}
                            />
                            <Input
                                name="startYear"
                                placeholder="Start Year"
                                value={experienceData.startDate.year}
                                onChange={(e) =>
                                    handleSelectChange('startDate', 'year', e.target.value)
                                }
                            />
                            <Months
                                type="End"
                                handleSelectChange={handleSelectChange}
                                value={experienceData.endDate.month}
                            />
                            <Input
                                name="endYear"
                                placeholder="End Year"
                                value={experienceData.endDate.year}
                                onChange={(e) =>
                                    handleSelectChange('endDate', 'year', e.target.value)
                                }
                            />
                        </div>

                        {/* Experience Description */}
                        <div className="w-full">
                            <AITextImprovementInput
                                name="description"
                                value={experienceData.description}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.description}
                            />
                        </div>
                    </div>
                }
                displayView={
                    <div className="times flex w-full flex-col">
                        <div className="flex flex-row justify-between gap-2 font-bold">
                            <p>
                                {experienceData.company == ''
                                    ? PLACEHOLDERS.company
                                    : experienceData.company}
                            </p>
                            <p>
                                {experienceData.location == ''
                                    ? PLACEHOLDERS.location
                                    : experienceData.location}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>
                                {experienceData.position == ''
                                    ? PLACEHOLDERS.position
                                    : experienceData.position}
                            </p>
                            <div className="flew-col flex items-center italic">
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView
                                        monthNumber={experienceData.startDate.month}
                                        placeHolder={PLACEHOLDERS.startMonth}
                                    />
                                    <p className="times">
                                        {experienceData.startDate.year ?? PLACEHOLDERS.startYear}
                                    </p>
                                </div>
                                <p className="px-2">-</p>
                                <div className="flew-col flex items-center">
                                    <MonthDisplayView
                                        monthNumber={experienceData.endDate.month}
                                        placeHolder={PLACEHOLDERS.endMonth}
                                    />
                                    <p className="">
                                        {experienceData.endDate.year ?? PLACEHOLDERS.endYear}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <BulletPointDisplayView
                            text={experienceData.description}
                            placeHolder={PLACEHOLDERS.description}
                        />
                    </div>
                }
            />
        </>
    );
}

export default Experience;
