import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {SectionTitle} from './SectionTitle';

const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

const Projects = ({projects}) => {
    const [projectData, setProjectData] = useState({
        title: projects.items[0]?.title || '',
        description: projects.items[0]?.description || '',
        technologies: projects.items[0]?.technologies,
        role: projects.items[0]?.organization || '',
        link: projects.items[0]?.link,
        location: projects.items[0]?.location || '',
        startMonth: projects.items[0]?.startDate.month || '',
        startYear: projects.items[0]?.startDate.year || '',
    });

    const handleInputChange = (e) => {
        setProjectData({...projectData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (name, value) => {
        setProjectData({...projectData, [name]: value});
    };

    return (
        <div className="">
            {/* Projects Form Section */}
            <div className="mt-6 w-full">
                {' '}
                <SectionTitle title="Projects" />
                {/* Combined Row for Project Title and Description */}
                <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="title" value={projectData.title} onChange={handleInputChange} placeholder={projects.items[0]?.title || 'Enter project title'} className="times" />
                    </div>
                    <div className="w-full">
                        <Input
                            name="description"
                            value={projectData.description}
                            onChange={handleInputChange}
                            placeholder={projects.items[0]?.description || 'Project description'}
                            className="times"
                        />
                    </div>
                </div>
                {/* Technologies and Organizations */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="sm:flex-grow">
                        <Input name="technologies" placeholder="Technologies used (e.g., JavaScript, React)" value={projectData.technologies} onChange={handleInputChange} className="times" />
                    </div>

                    <div className="w-full">
                        <Input name="role" placeholder={projects.items[0]?.organization || 'Your role in the project'} value={projectData.role} onChange={handleInputChange} className="times" />
                    </div>
                </div>
                {/* Project Link */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="w-full">
                        <Input name="link" placeholder="Link to project (e.g., GitHub, live site)" value={projectData.link} onChange={handleInputChange} className="times" />
                    </div>
                </div>
                {/* Location and Dates */}
                <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div className="sm:flex-grow">
                        <Input
                            name="location"
                            placeholder={projects.items[0]?.location || 'Location (e.g., City, State)'}
                            value={projectData.location}
                            onChange={handleInputChange}
                            className="times"
                        />
                    </div>
                    <div className="flex space-x-4 md:w-1/2">
                        <Select className="times" onValueChange={(value) => handleSelectChange('startMonth', value)}>
                            <SelectTrigger className="times">
                                <SelectValue placeholder={projects.items[0]?.startDate.month ? SEASONS[projects.items[0]?.startDate.month - 1] : 'Start Month'} />
                            </SelectTrigger>
                            <SelectContent>
                                {SEASONS.map((month, index) => (
                                    <SelectItem value={index + 1} key={month}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input name="startYear" placeholder="Start Year" value={projectData.startYear} onChange={handleInputChange} className="times" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
