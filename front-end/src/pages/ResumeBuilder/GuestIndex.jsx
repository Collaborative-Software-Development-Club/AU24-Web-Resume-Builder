import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import Sidebar from './Sidebar';
import {Projects} from './Projects';
import {Experiences} from './Experiences';
import {Button} from '@/components/ui/button';
import {GuestSaveDialog} from '@/components/GuestSaveDialog';
import {useState} from 'react';
import createResume from '@/services/createResume';
import {downloadResume} from '@/services/downloadResume';
import {DEFAULT_RESUME} from './DEFAULT_RESUME';

export default function ResumeBuilder() {
    const [resume, setResume] = useState(DEFAULT_RESUME);
    const [ordering, setOrdering] = useState(
        DEFAULT_RESUME.orderOfSections.map((item, index) => ({
            title: item,
            id: index.toString(),
        })),
    );

    console.log(resume);

    //to be passed into GuestSaveDialog
    const handleSave = async () => {
        try {
            await createResume(resume);
        } catch (error) {
            console.error('Failed to save resume:', error);
        }
    };

    const download = () => {
        downloadResume(resume);
    };

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
    };

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
                items: [...experience],
            },
        }));
    };

    const updateProjects = (projects) => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: {
                ...prevResume.projects,
                items: [...projects],
            },
        }));
    };

    const updateSkills = (skills) => {
        setResume((prevResume) => ({
            ...prevResume,
            skills: {
                ...prevResume.skills,
                items: skills,
            },
        }));
    };

    if (!resume) return <p>Loading...</p>;

    // Map of components for easy rendering
    const components = {
        EDUCATION: <Education updateEducation={updateEducation} education={resume.education} />,
        EXPERIENCE: <Experiences updateExperience={updateExperience} experiences={resume.experience.items} />,
        PROJECTS: <Projects updateProjects={updateProjects} projects={resume.projects.items} />,
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
        <div className="flex justify-center pb-20 sm:mx-10">
            <div className="flex flex-col items-stretch justify-start self-stretch">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility} />

                {/* Static components */}
                <div className="flex flex-row justify-end gap-4">
                    <Button className="" variant="secondary" onClick={() => download()}>
                        Download
                    </Button>
                    <GuestSaveDialog />
                </div>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods contactMethods={resume.contactMethods} updateContactMethods={updateContactMethods} />

                {/* Render ordered components conditionally */}
                {ordering?.map((item) => isVisible(item.title) && <div key={item.id}>{components[item.title]}</div>)}
            </div>
        </div>
    );
}
