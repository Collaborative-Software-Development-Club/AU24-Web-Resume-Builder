import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import Months from './Months';

const PLACEHOLDERS = {
    position: 'Enter your position title',
    company: 'Company or Organization',
    description: 'Brief description of responsibilities',
    startMonth: 'Start Month',
    startYear: 'Start Year',
    endMonth: 'End Month (or present)',
    endYear: 'End Year',
    location: 'Location (e.g., City, State)',
};

//Remove the usestate, update handle functions, and add Month component
export function Experience({updateItems, experience}) {
    const [experienceData, setExperienceData] = useState({
        visible: experience?.visible,
        id: experience?.id,
        position: experience?.position || '',
        company: experience?.company || '',
        description: experience?.description || '',
        location: experience?.location || '',
        startDate: {
            month: experience?.startDate?.month || '',
            year: experience?.startDate?.year || '',
        },
        endDate: {
            month: experience?.endDate?.month || '',
            year: experience?.endDate?.year || '',
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
        <div className="flex w-full flex-col gap-2">
            <div className="grid grid-cols-6 gap-2">
                <Input name="position" value={experienceData.position} placeholder={PLACEHOLDERS.position} className="text-md col-span-2 font-bold" onChange={handleInputChange} />
                <Input name="location" value={experienceData.location} placeholder={PLACEHOLDERS.location} className="col-span-2" onChange={handleInputChange} />
                <Input name="company" value={experienceData.company} placeholder={PLACEHOLDERS.company} className="col-span-2" onChange={handleInputChange} />
            </div>

            {/* Start Date (Month and Year) */}
            <div className="grid grid-cols-6 gap-2">
                <Months type="Start" handleSelectChange={handleSelectChange} value={experienceData.startDate.month} />

                <Input name="startYear" placeholder="Start Year" value={experienceData.startDate.year} onChange={(e) => handleSelectChange('startDate', 'year', e.target.value)} />

                <Months type="End" handleSelectChange={handleSelectChange} value={experienceData.endDate.month} />

                <Input name="endYear" placeholder="End Year" value={experienceData.endDate.year} onChange={(e) => handleSelectChange('endDate', 'year', e.target.value)} />
            </div>

            {/* Experience Description */}
            <div className="w-full">
                <Input name="description" value={experienceData.description} placeholder={PLACEHOLDERS.description} onChange={handleInputChange} />
            </div>
        </div>
    );
}

export default Experience;
