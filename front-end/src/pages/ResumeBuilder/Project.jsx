import {useState} from 'react';
import {Input} from '@/components/ui/input';
import Months from './Months';
import AITextImprovementButton from '@/components/ui/AITextImprovementButton'

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

export function Project({updateItems, project}) {
    const [projectData, setProjectData] = useState({
        id: project?.id,
        visible: project?.visible,
        title: project?.title || '',
        description: project?.description || '',
        technologies: project?.technologies,
        role: project?.organization || '',
        link: project?.link,
        location: project?.location || '',
        startDate: {
            month: project?.startDate?.month || '',
            year: project?.startDate?.year || '',
        },
    });

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newExperienceData = {
            ...projectData,
            [name]: value,
        };
        setProjectData(newExperienceData);
        updateItems(newExperienceData);
    };

    // Handle selection changes for month
    const handleSelectChange = (dateType, field, value) => {
        const updatedData = {
            ...projectData,
            startDate: {
                ...projectData.startDate,
                month: value,
            },
        };
        setProjectData(updatedData);
        updateItems(updatedData);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Combined Row for Project Title and Date */}
            <div className="grid grid-cols-6 gap-2">
                <Input name="title" value={projectData.title} onChange={handleInputChange} placeholder={PLACEHOLDERS.title} className="text-md col-span-3 font-bold" />
                <Input name="link" placeholder={PLACEHOLDERS.link} value={projectData.link} onChange={handleInputChange} className="col-span-1" />
                <Months type="Start" value={projectData.startDate.month} handleSelectChange={handleSelectChange} className="col-span-1" />
                <Input name="startYear" placeholder={PLACEHOLDERS.startYear} value={projectData.startYear} onChange={handleInputChange} className="col-span-1" />
            </div>
            {/* Organization and location*/}
            <div className="grid grid-cols-3 gap-2">
                <Input name="role" placeholder={PLACEHOLDERS.organization} value={projectData.role} onChange={handleInputChange} className="col-span-2" />
                <Input name="location" placeholder={PLACEHOLDERS.location} value={projectData.location} onChange={handleInputChange} className="col-span-1" />
            </div>
            {/* Project Description */}
            <div className="w-full">
                <AITextImprovementButton className="w-full" placeholder={PLACEHOLDERS.description} value={projectData.description} onChange={handleInputChange}/>
            </div>
            {/* Technologies */}
            <div className="sm:flex-grow">
                <Input name="technologies" placeholder={PLACEHOLDERS.technologies} value={projectData.technologies} onChange={handleInputChange} className="" />
            </div>
        </div>
    );
}
