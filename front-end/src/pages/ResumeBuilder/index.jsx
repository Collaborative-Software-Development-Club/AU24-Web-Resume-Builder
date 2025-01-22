import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import Sidebar from './Sidebar';
import useResumeData from './useResumeData';
import {Projects} from './Projects';
import {Experiences} from './Experiences';
import {Button} from '@/components/ui/button';
import {useState, useEffect} from 'react';
import {downloadResume} from '@/services/downloadResume';

const USE_API = false;
const DEFAULT_RESUME_ID = '67352f2265e5d74b8503ce90';

export default function ResumeBuilder() {
    const {resume, setResume, save} = useResumeData(DEFAULT_RESUME_ID, USE_API);
    const [ordering, setOrdering] = useState([]);
    console.log(resume);

    useEffect(() => {
        if (resume) {
            setOrdering(
                resume.orderOfSections.map((item, index) => ({
                    title: item,
                    id: index.toString(),
                })),
            );
        }
    }, [resume]);

    const updateName = (name) => {
        setResume((prevResume) => ({
            ...prevResume,
            name: name,
        }));
    };

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

    const download = () => {
        downloadResume(resume);
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-stretch justify-start self-stretch">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility} />

                {/* Static components */}
                <div className="flex flex-row justify-end gap-4">
                    <Button className="" variant="secondary" onClick={() => download()}>
                        Download
                    </Button>
                    <Button className="" onClick={save}>
                        Save
                    </Button>
                </div>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods contactMethods={resume.contactMethods} />

                {/* Render ordered components conditionally */}
                {ordering?.map((item) => isVisible(item.title) && <div key={item.id}>{components[item.title]}</div>)}
            </div>
        </div>
    );
}
