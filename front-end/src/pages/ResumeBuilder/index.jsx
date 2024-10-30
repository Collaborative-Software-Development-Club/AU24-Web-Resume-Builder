import { Name } from './Name';
import Education from './Education';
import { ContactMethods } from './ContactMethods';
import Skills from './Skills';
import { Sidebar } from './Sidebar';
import useResumeData from './useResumeData';
import { Projects } from './Projects';
import { Experiences } from './Experiences';
import { useState } from 'react';

const USE_API = true;
const DEFAULT_RESUME_ID = '6718101a6929694694c9f0b7';
const INITIAL_ORDER = [
    { id: '1', title: 'education' },
    { id: '2', title: 'experience' },
    { id: '3', title: 'projects' },
    { id: '4', title: 'skills' },
];

export default function ResumeBuilder() {
    const resume = useResumeData(DEFAULT_RESUME_ID, USE_API);
    const [ordering, setOrdering] = useState(INITIAL_ORDER);

    if (!resume) return <p>Loading...</p>;

    const components = {
        education: <Education education={resume.education} />,
        experience: <Experiences resume={resume} experiences={resume.experience} />,
        projects: <Projects projects={resume.projects} />,
        skills: <Skills skills={resume.skills.items} />,
    };

    return (
        <div className="flex justify-center">
            <div className="items-stretch flex flex-col justify-start self-stretch">
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} />
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                {ordering.map((item) => components[item.title])}
            </div>
        </div>
    );
}
