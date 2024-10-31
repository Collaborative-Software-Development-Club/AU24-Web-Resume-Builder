import { Name } from './Name';
import Education from './Education';
import { ContactMethods } from './ContactMethods';
import Skills from './Skills';
import { Sidebar } from './Sidebar';
import useResumeData from './useResumeData';
import { Projects } from './Projects';
import { Experiences } from './Experiences';
import { useState, useEffect } from 'react';

const USE_API = true;
const DEFAULT_RESUME_ID = '6718101a6929694694c9f0b7';

export default function ResumeBuilder() {
    const resume = useResumeData(DEFAULT_RESUME_ID, USE_API);
    const [ordering, setOrdering] = useState([]);

    useEffect(() => {
        if (resume?.orderOfSections) {
            setOrdering(resume.orderOfSections.map((item, index) => ({
                title: item,
                id: index.toString(),
            })));
        }
    }, [resume]);

    if (!resume) return <p>Loading...</p>;

    const components = {
        EDUCATION: <Education education={resume.education} />,
        EXPERIENCES: <Experiences resume={resume} experience={resume.experience} />,
        PROJECTS: <Projects projects={resume.projects} />,
        SKILLS: <Skills skills={resume.skills.items} />,
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-stretch justify-start self-stretch">
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} />
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                {ordering?.map((item) => {
                    if (resume?.[item.title.toLowerCase()]?.visible) {
                        return (
                            <div key={item.id}>
                                {components[item.title]}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
