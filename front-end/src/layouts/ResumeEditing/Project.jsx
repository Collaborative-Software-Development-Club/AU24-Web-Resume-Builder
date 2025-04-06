import {Input} from '@/components/ui/input';
import Months from './Months';
import {EditOnClick} from '../../components/EditOnClick';
import {BulletPointDisplayView} from './BulletPointDisplayView';
import {AITextImprovementInput} from '@/components/AITextImprovementInput';
import {ItemDateDisplayView} from './ItemDateDisplayView';

const PLACEHOLDERS = {
    title: 'Enter project title',
    description: 'Project description',
    technologies: 'Technologies used (e.g., JavaScript, React)',
    link: 'Link to project',
    location: 'Location (e.g., City, State)',
    organization: 'Organization (e.g., Company, University)',
    startMonth: 'Start Month',
    startYear: 'Start Year',
    endMonth: 'End Month',
    endYear: 'End Year',
};

export function Project({updateItems, project}) {
    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const updatedProject = {
            ...project,
            [name]: value,
        };
        updateItems(updatedProject);
    };

    // Handle selection changes for dates
    const handleSelectChange = (dateType, field, value) => {
        const updatedProject = {
            ...project,
            [dateType]: {
                ...project[dateType],
                [field]: value,
            },
        };
        updateItems(updatedProject);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Combined Row for Project T  itle and Date */}
            <EditOnClick
                empty={project == undefined || project.title == ''}
                editingView={
                    <div className="flex w-full flex-col gap-2">
                        <div className="times grid grid-cols-8 gap-2">
                            <Input
                                name="title"
                                value={project.title}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.title}
                                className="text-md col-span-2 font-bold"
                            />
                            <Input
                                name="link"
                                placeholder={PLACEHOLDERS.link}
                                value={project.link}
                                onChange={handleInputChange}
                                className="col-span-2"
                            />
                            <Months
                                type="Start"
                                value={project.startDate.month}
                                handleSelectChange={(value) =>
                                    handleSelectChange('startDate', 'month', value)
                                }
                                className="col-span-1"
                            />
                            <Input
                                name="startYear"
                                type="number"
                                inputMode="numeric"
                                placeholder={PLACEHOLDERS.startYear}
                                value={project.startDate.year}
                                onChange={(e) =>
                                    handleSelectChange('startDate', 'year', Number(e.target.value))
                                }
                                className="col-span-1 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <Months
                                type="end"
                                value={project.endDate.month}
                                handleSelectChange={(value) =>
                                    handleSelectChange('endDate', 'month', value)
                                }
                                className="col-span-1"
                            />
                            <Input
                                name="endYear"
                                type="number"
                                inputMode="numeric"
                                placeholder={PLACEHOLDERS.startYear}
                                value={project.endDate.year}
                                onChange={(e) =>
                                    handleSelectChange('endDate', 'year', Number(e.target.value))
                                }
                                className="col-span-1 [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </div>
                        <div className="times grid grid-cols-3 gap-2">
                            <Input
                                name="organization"
                                placeholder={PLACEHOLDERS.organization}
                                value={project.organization}
                                onChange={handleInputChange}
                                className="col-span-2"
                            />
                            <Input
                                name="location"
                                placeholder={PLACEHOLDERS.location}
                                value={project.location}
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
                                value={project.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Technologies */}
                        <div className="sm:flex-grow">
                            <Input
                                name="technologies"
                                placeholder={PLACEHOLDERS.technologies}
                                value={project.technologies}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                }
                displayView={
                    <div className="times flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <p className="col-span-3 font-bold">{project.title}</p>
                            <p>{project.link}</p>
                            <ItemDateDisplayView
                                startDate={project.startDate}
                                endDate={project.endDate}
                            />
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <p>{project.organization}</p>
                            <p>{project.location}</p>
                        </div>
                        <BulletPointDisplayView text={project.description} />
                        {/* Technologies */}
                        <div className="sm:flex-grow">
                            <p>{project.technologies}</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
