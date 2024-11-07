import { Name } from './Name';
import Education from './Education';
import { ContactMethods } from './ContactMethods';
import Skills from './Skills';
import Sidebar from './Sidebar';
import useResumeData from './useResumeData';
import { Projects } from './Projects';
import { Experiences } from './Experiences';
import { useState, useEffect } from 'react';

const USE_API = false;
const DEFAULT_RESUME_ID = '6718101a6929694694c9f0b7';

export default function ResumeBuilder() {
    const fetchedResume = useResumeData(DEFAULT_RESUME_ID, USE_API);
    const [resume, setResume] = useState(null);
    const [ordering, setOrdering] = useState([]);

    useEffect(() => {
        if (fetchedResume) {
            setResume(fetchedResume);
            setOrdering(
                fetchedResume.orderOfSections.map((item, index) => ({
                    title: item,
                    id: index.toString(),
                }))
            );
        }
    }, [fetchedResume]);

    if (!resume) return <p>Loading...</p>;

    // Map of components for easy rendering
    const components = {
        EDUCATION: <Education resume={resume} education={resume.education} />,
        EXPERIENCE: <Experiences resume={resume} experiences={resume.experience} />,
        PROJECTS: <Projects resume={resume} projects={resume.projects} />,
        SKILLS: <Skills skills={resume.skills.items} />,
    };

    // function to toggle visibility
    const toggleSectionVisibility = (sectionName, isVisible) => {
        setResume((prevResume) => ({
            ...prevResume,
            [sectionName]: {
                ...prevResume[sectionName],
                visible: isVisible,
            },
        }));
    };

    // Helper function to check visibility
    const isVisible = (title) => resume?.[title.toLowerCase()]?.visible;


    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-stretch justify-start self-stretch">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility}/>
                
                {/* Static components */}
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />

                {/* Render ordered components conditionally */}
                {ordering?.map((item) => (
                    isVisible(item.title) && (
                        <div key={item.id}>
                            {components[item.title]}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
