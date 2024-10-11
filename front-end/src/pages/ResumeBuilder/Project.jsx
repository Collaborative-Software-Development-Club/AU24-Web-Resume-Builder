import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

const PLACEHOLDERS = {
    title: 'Enter project title',
    description: 'Project description',
    technologies: 'Technologies used (e.g., JavaScript, React)',
    role: 'Your role in the project',
    link: 'Link to project (e.g., GitHub, live site)',
    location: 'Location (e.g., City, State)',
    organization: 'Organization (e.g., Company, University)',
    startMonth: 'Start Month',
    startYear: 'Start Year',
};

const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

export function Project({project}) {
    const [projectData, setProjectData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        technologies: project?.technologies,
        role: project?.organization || '',
        link: project?.link,
        location: project?.location || '',
        startMonth: project?.startDate.month || '',
        startYear: project?.startDate.year || '',
    });

    const handleInputChange = (e) => {
        setProjectData({...projectData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (name, value) => {
        setProjectData({...projectData, [name]: value});
    };
    return (
        <div className="flex w-full flex-col gap-2">
            {/* Combined Row for Project Title and Date */}
            <div className="grid grid-cols-6 gap-2">
                <Input name="title" value={projectData.title} onChange={handleInputChange} placeholder={PLACEHOLDERS.title} className="text-md col-span-3 font-bold" />
                <Input name="link" placeholder={PLACEHOLDERS.link} value={projectData.link} onChange={handleInputChange} className="col-span-1" />
                <Select className="" onValueChange={(value) => handleSelectChange('startMonth', value)}>
                    <SelectTrigger className="col-span-1">
                        <SelectValue placeholder={PLACEHOLDERS.startMonth} />
                    </SelectTrigger>
                    <SelectContent>
                        {SEASONS.map((month, index) => (
                            <SelectItem value={index + 1} key={month}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input name="startYear" placeholder={PLACEHOLDERS.startYear} value={projectData.startYear} onChange={handleInputChange} className="col-span-1" />
            </div>
            {/*  Organization and location*/}
            <div className="grid grid-cols-3 gap-2">
                <Input name="role" placeholder={PLACEHOLDERS.organization} value={projectData.role} onChange={handleInputChange} className="col-span-2" />
                <Input name="location" placeholder={PLACEHOLDERS.location} value={projectData.location} onChange={handleInputChange} className="col-span-1" />
            </div>
            {/* Project Description */}
            <div className="w-full">
                <Input name="description" value={projectData.description} onChange={handleInputChange} placeholder={PLACEHOLDERS.description} className="" />
            </div>
            {/* Technologies */}
            <div className="sm:flex-grow">
                <Input name="technologies" placeholder={PLACEHOLDERS.technologies} value={projectData.technologies} onChange={handleInputChange} className="" />
            </div>
        </div>
    );
}
