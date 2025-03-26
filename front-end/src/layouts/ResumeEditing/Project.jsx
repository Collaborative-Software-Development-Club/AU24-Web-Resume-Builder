import PropTypes from 'prop-types';
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
    link: 'Link to project',
    location: 'Location (e.g., City, State)',
    organization: 'Organization (e.g., Company, University)',
    startMonth: 'Start Month',
    startYear: 'Start Year',
    endMonth: 'End Month',
    endYear: 'End Year',
};

export function Project({updateItems, project}) {
    console.log('project in Project', project);

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const updatedProject = {
            ...project,
            [name]: value,
        };
        updateItems(updatedProject);
    };

    // Handle selection changes for month
    const handleSelectChange = (dateType, field, value) => {
        const updatedProject = {
            ...project,
            startDate: {
                ...project.startDate,
                month: value,
            },
        };
        updateItems(updatedProject);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {/* Combined Row for Project T  itle and Date */}
            <SectionEditing
                empty={project == undefined || project.title == ''}
                editingView={
                    <div className="flex w-full flex-col gap-2">
                        <div className="grid grid-cols-6 gap-2">
                            <Input
                                name="title"
                                value={project.title}
                                onChange={handleInputChange}
                                placeholder={PLACEHOLDERS.title}
                                className="text-md col-span-3 font-bold"
                            />
                            <Input
                                name="link"
                                placeholder={PLACEHOLDERS.link}
                                value={project.link}
                                onChange={handleInputChange}
                                className="col-span-1"
                            />
                            <Months
                                type="Start"
                                value={project.startDate.month}
                                handleSelectChange={handleSelectChange}
                                className="col-span-1"
                            />
                            <Input
                                name="startYear"
                                placeholder={PLACEHOLDERS.startYear}
                                value={project.startYear}
                                onChange={handleInputChange}
                                className="col-span-1"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
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
                                className=""
                            />
                        </div>
                    </div>
                }
                displayView={
                    <div className="times flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <p className="col-span-3 font-bold">
                                {project.title == '' ? PLACEHOLDERS.title : project.title}
                            </p>
                            <p>{project.link == '' ? PLACEHOLDERS.link : project.link}</p>
                            <div className="flex items-center justify-between italic">
                                <MonthDisplayView
                                    monthNumber={project.startDate.month}
                                    placeHolder={PLACEHOLDERS.startMonth}
                                />
                                <p>{project.startDate?.year ?? PLACEHOLDERS.startYear}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between gap-2">
                            <p>
                                {project.organization == ''
                                    ? PLACEHOLDERS.organization
                                    : project.organization}
                            </p>
                            <p>
                                {project.location == '' ? PLACEHOLDERS.location : project.location}
                            </p>
                        </div>
                        <BulletPointDisplayView
                            text={project.description}
                            placeHolder={PLACEHOLDERS.description}
                        />
                        {/* Technologies */}
                        <div className="sm:flex-grow">
                            <p>
                                {project.technologies == ''
                                    ? PLACEHOLDERS.technologies
                                    : project.technologies}
                            </p>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

// Add PropTypes validation
Project.propTypes = {
    updateItems: PropTypes.func.isRequired,
    project: PropTypes.shape({
        orderId: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        technologies: PropTypes.string,
        organization: PropTypes.string,
        link: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.shape({
            month: PropTypes.number,
            year: PropTypes.number,
        }),
        endDate: PropTypes.shape({
            month: PropTypes.number,
            year: PropTypes.number,
        }),
    }),
};
