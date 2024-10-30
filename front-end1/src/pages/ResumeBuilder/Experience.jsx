import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

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

const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

export function Experience({experience}) {
    const [experienceData, setExperienceData] = useState({
        position: experience?.position || '',
        company: experience?.company || experience?.organization || '',
        description: experience?.description || '',
        location: experience?.location || '',
        startMonth: experience?.startDate?.month || '',
        startYear: experience?.startDate?.year || '',
        endMonth: experience?.endDate?.month || '',
        endYear: experience?.endDate?.year || '',
    });

    const formatMonth = (month) => SEASONS[month - 1] || '';

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Combined Row for Position Title, Company/Organization, and Location */}
            <div className="grid grid-cols-6 gap-2">
                <Input name="position" value={experienceData.position} placeholder={PLACEHOLDERS.position} className="text-md col-span-2 font-bold" readOnly />
                <Input name="company" value={experienceData.company} placeholder={PLACEHOLDERS.company} className="col-span-2" readOnly />
                <Input name="location" value={experienceData.location} placeholder={PLACEHOLDERS.location} className="col-span-2" readOnly />
            </div>

            {/* Start Date (Month and Year) */}
            <div className="grid grid-cols-6 gap-2">
                <Input name="startMonth" value={formatMonth(experienceData.startMonth)} placeholder={PLACEHOLDERS.startMonth} className="col-span-1" readOnly />
                <Input name="startYear" value={experienceData.startYear} placeholder={PLACEHOLDERS.startYear} className="col-span-1" readOnly />

                {/* End Date (Month and Year) */}
                <Input name="endMonth" value={formatMonth(experienceData.endMonth)} placeholder={PLACEHOLDERS.endMonth} className="col-span-1" readOnly />
                <Input name="endYear" value={experienceData.endYear || 'Present'} placeholder={PLACEHOLDERS.endYear} className="col-span-1" readOnly />
            </div>

            {/* Experience Description */}
            <div className="w-full">
                <Input name="description" value={experienceData.description} placeholder={PLACEHOLDERS.description} className="" readOnly />
            </div>
        </div>
    );
}

export default Experience;
