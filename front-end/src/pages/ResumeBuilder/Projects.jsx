import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SectionTitle } from './SectionTitle';

const Projects = ({ projects }) => {
  const [projectData, setProjectData] = useState({
    title: projects.title,
    description: projects.description,
    technologies: projects.technologies,
    role: projects.role,
    link: projects.link,
  });

  const handleInputChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      {/* Projects Form Section */}
      <div className="w-full mt-6"> {/* Added margin-top to create gap between Skills and Projects section */}
        <SectionTitle title="Projects" />
        {/* Combined Row for Project Title and Description */}
        <div className="mb-4 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="sm:flex-grow">
            <Input
              name="title"
              value={projectData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              className="times"
            />
          </div>
          <div className="w-full">
            <Input
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              placeholder="Project description"
              className="times"
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="sm:flex-grow">
            <Input
              name="technologies"
              placeholder="Technologies used (e.g., JavaScript, React)"
              value={projectData.technologies}
              onChange={handleInputChange}
              className="times"
            />
          </div>

          <div className="w-full">
            <Input
              name="role"
              placeholder="Your role in the project"
              value={projectData.role}
              onChange={handleInputChange}
              className="times"
            />
          </div>
        </div>

        {/* Project Link */}
        <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full">
            <Input
              name="link"
              placeholder="Link to project (e.g., GitHub, live site)"
              value={projectData.link}
              onChange={handleInputChange}
              className="times"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;