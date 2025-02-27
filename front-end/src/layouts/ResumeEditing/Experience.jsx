import {useState} from 'react';
import {Input} from '@/components/ui/input';
import Months from './Months';
import {BulletedInputBox} from '@/components/BulletedInputBox';
import {SectionEditing} from './SectionEditing';
import {BulletPointDisplayView} from './BulletPointDisplayView';
import {MonthDisplayView} from './MonthDisplayView';

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
const DISPLAY_FORMAT =
    ' flex h-9 rounded-md border text-sm shadow-sm items-center px-3 py-1';
const DISPLAY_FORMAT_POSITION =
    ' flex h-9 rounded-md border text-md font-bold shadow-sm items-center px-3 py-1';

//Remove the usestate, update handle functions, and add Month component
export function Experience({updateItems, experience}) {
    const [experienceData, setExperienceData] = useState({
        visible: experience?.visible,
        id: experience?.id,
        position: experience?.position,
        company: experience?.company,
        description: experience?.description ,
        location: experience?.location,
        startDate: {
            month: experience?.startDate?.month,
            year: experience?.startDate?.year,
        },
        endDate: {
            month: experience?.endDate?.month,
            year: experience?.endDate?.year,
        },
    });

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newExperienceData = {
            ...experienceData,
            [name]: value,
        };
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
    return (
        <SectionEditing
            empty={experience == undefined || experienceData.position == ''}
            editingView={
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-6 gap-2">
                        <Input
                            name="position"
                            value={experienceData.position}
                            placeholder={PLACEHOLDERS.position}
                            className="text-md col-span-2 font-bold"
                            onChange={handleInputChange}
                        />
                        <Input
                            name="location"
                            value={experienceData.location}
                            placeholder={PLACEHOLDERS.location}
                            className="col-span-2"
                            onChange={handleInputChange}
                        />
                        <Input
                            name="company"
                            value={experienceData.company}
                            placeholder={PLACEHOLDERS.company}
                            className="col-span-2"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Start Date (Month and Year) */}
                    <div className="grid grid-cols-6 gap-2">
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
                            onChange={(e) => handleSelectChange('endDate', 'year', e.target.value)}
                        />
                    </div>

                    {/* Experience Description */}
                    <div className="w-full">
                        <Input
                            name="description"
                            value={experienceData.description}
                            onChange={handleInputChange}
                            placeholder={PLACEHOLDERS.description}
                            className=""
                        />
                    </div>
                </div>
            }
            displayView={
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-6 gap-2">
                        <div className={'times col-span-2' + DISPLAY_FORMAT_POSITION}>
                        <p>
                            {experienceData.position ?? PLACEHOLDERS.position}
                        </p>
                        </div>
                        <p className={'times col-span-2' + DISPLAY_FORMAT}>
                            {experienceData.location ?? PLACEHOLDERS.location}
                        </p>
                        <p className={'times col-span-2' + DISPLAY_FORMAT}>
                            {experienceData.company ?? PLACEHOLDERS.company}
                        </p>
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        <MonthDisplayView monthNumber={experienceData.startDate.month} placeHolder={PLACEHOLDERS.startMonth} />
                        <p className={'times' + DISPLAY_FORMAT}>
                            {experienceData.startDate.year ?? PLACEHOLDERS.startYear}
                        </p>
                        <MonthDisplayView monthNumber={experienceData.endDate.month} placeHolder={PLACEHOLDERS.endMonth}/>
                        <p className={'times' + DISPLAY_FORMAT}>
                            {experienceData.endDate.year ?? PLACEHOLDERS.endYear}
                        </p>
                    </div>
                    <BulletPointDisplayView text={experienceData.description} placeHolder={PLACEHOLDERS.description}/>
                </div>
            }
        />
    );
}

export default Experience;
