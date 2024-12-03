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
import uploadResumeData from '@/services/uploadResumeData';
import { useParams } from 'react-router-dom';

const USE_API = true;

export default function ResumeBuilder() {
    const resumeId = useParams()?.resumeId;
    const {resume, setResume, save} = useResumeData(resumeId, USE_API);
    const [ordering, setOrdering] = useState([]);
    console.log(resume);

    //change to updateOrder
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

    const updateContactMethods = (contactMethods) => {
        setResume((prevResume) => ({
            ...prevResume,
            contactMethods: contactMethods,
        }));
    }

    const updateEducation = (updatedFields) => {
        setResume((prevResume) => ({
            ...prevResume,
            education: {
                ...prevResume.education,
                ...updatedFields,
            },
        }));
    };
    

    const updateExperience = (experience) => {
        setResume((prevResume) => ({
            ...prevResume,
            experience: {
                ...prevResume.experience,
                items: experience,
            }
        }));
    };

    const updateProjects = (projects) => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: {
                ...prevResume.projects,
                items: projects,
        }}));
    };

    const updateSkills = (skills) => {
        setResume((prevResume) => ({
            ...prevResume,
            skills: {
                ...prevResume.skills,
                items: skills
            },
        }));
    }

    if (!resume) return <p>Loading...</p>;

    // Map of components for easy rendering
    const components = {
        EDUCATION: <Education updateEducation={updateEducation} education={resume.education} />,
        EXPERIENCE: <Experiences updateExperience={updateExperience} experiences={resume.experience} />,
        PROJECTS: <Projects updateProjects={updateProjects} projects={resume.projects} />,
        SKILLS: <Skills updateSkills={updateSkills} skills={resume.skills.items} />,
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
        <div className="flex justify-center pb-20 sm:mx-2">
            <div className="flex flex-col items-stretch justify-start self-stretch">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility} />

                {/* Static components */}
                <Button className="self-end" onClick={save}>
                    Save
                </Button>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods contactMethods={resume.contactMethods} updateContactMethods={updateContactMethods}/>

                {/* Render ordered components conditionally */}
                {ordering?.map((item) => isVisible(item.title) && <div key={item.id}>{components[item.title]}</div>)}
            </div>
        </div>
    );
}
