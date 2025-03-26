import {useState} from 'react';
import {Input} from '@/components/ui/input';
import Months from './Months';
import {SectionEditing} from './SectionEditing';
import {BulletPointDisplayView} from './BulletPointDisplayView';
import {MonthDisplayView} from './MonthDisplayView';
import {AITextImprovementInput} from '@/components/AITextImprovementInput';

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
        orderId: project?.orderId,
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
    // console.log('projectData in Project', projectData);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const newProjectData = {
            ...projectData,
            [name]: value,
        };
        // console.log('newProjectData', newProjectData);
        setProjectData(newProjectData);
        updateItems(newProjectData);
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
            {/* Combined Row for Project T  itle and Date */}
            <SectionEditing
                empty={projectData == undefined || projectData.title == ''}
                editingView={
                    <>
                        <div className="grid grid-cols-6 gap-2">
                            <Input
                                name="title"
                                value={projectData.title}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.title}
                                className="text-md col-span-3 font-bold"
                            />
                            <Input
                                name="link"
                                placeholder={PLACEHOLDERS.link}
                                value={projectData.link}
                                onChange={handleInputChange}
                                className="col-span-1"
                            />
                            <Months
                                type="Start"
                                value={projectData.startDate.month}
                                handleSelectChange={handleSelectChange}
                                className="col-span-1"
                            />
                            <Input
                                name="startYear"
                                placeholder={PLACEHOLDERS.startYear}
                                value={projectData.startYear}
                                onChange={handleInputChange}
                                className="col-span-1"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Input
                                name="role"
                                placeholder={PLACEHOLDERS.organization}
                                value={projectData.role}
                                onChange={handleInputChange}
                                className="col-span-2"
                            />
                            <Input
                                name="location"
                                placeholder={PLACEHOLDERS.location}
                                value={projectData.location}
                                onChange={handleInputChange}
                                className="col-span-1"
                            />
                        </div>
                        {/* Project Description */}
                        <div className="w-full">
                            <AITextImprovementInput
                                // className="w-full"
                                name="description"
                                placeholder={PLACEHOLDERS.description}
                                value={projectData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Technologies */}
                        <div className="sm:flex-grow">
                            <Input
                                name="technologies"
                                placeholder={PLACEHOLDERS.technologies}
                                value={projectData.technologies}
                                onChange={handleInputChange}
                                className=""
                            />
                        </div>
                    </>
                }
                displayView={
                    <>
                        <div className="grid grid-cols-6 gap-2">
                            <p className="times font-bold">{projectData.title ?? ''}</p>
                            <p className="times">{projectData.link ?? ''}</p>
                            <MonthDisplayView monthNumber={projectData.startDate.month} />
                            <p className="times">{projectData.startYear}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <p className="times">{projectData.role ?? ''}</p>
                            <p className="times">{projectData.location ?? ''}</p>
                        </div>
                        <BulletPointDisplayView text={projectData.description} />
                        {/* Technologies */}
                        <div className="sm:flex-grow">
                            <p className="times">{projectData.technologies ?? ''}</p>
                        </div>
                    </>
                }
            />
        </div>
    );
}
