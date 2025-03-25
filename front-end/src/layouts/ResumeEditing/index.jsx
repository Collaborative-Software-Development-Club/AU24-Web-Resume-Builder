import {downloadResume} from '@/services/downloadResume';
import {Button} from '@/components/ui/button';
import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import Sidebar from './Sidebar';
import {Projects} from './Projects';
import {Experiences} from './Experiences';
import {Fragment} from 'react';

export default function ResumeEditing({
    resume,
    ordering,
    setOrdering,
    toggleSectionVisibility,
    saveButton,
    updateName,
    updateContactMethods,
    updateEducation,
    updateExperience,
    updateProjects,
    updateSkills,
}) {
    const download = () => {
        downloadResume(resume);
    };
    console.log('resume in resumeEditing', resume);
    console.log('ordering', ordering);
    // Helper function to check visibility
    const isVisible = (title) => resume?.[title.toLowerCase()]?.visible;
    // Map of components for easy rendering
    const sections = {
        EDUCATION: (
            <Education updateEducation={updateEducation} education={resume.education.content} />
        ),
        EXPERIENCE: (
            <Experiences
                updateExperience={updateExperience}
                experiences={resume.experience.content}
            />
        ),
        PROJECTS: <Projects updateProjects={updateProjects} projects={resume.projects.content} />,
        SKILLS: <Skills updateSkills={updateSkills} skills={resume.skills.content ?? []} />,
    };
    return (
        <div className="flex justify-center pb-20 sm:mx-10">
            <div className="flex w-full max-w-6xl flex-col items-stretch justify-start self-stretch gap-2">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar
                    resume={resume}
                    ordering={ordering}
                    setOrdering={setOrdering}
                    toggleSectionVisibility={toggleSectionVisibility}
                />

                {/* Static components */}
                <div className="flex flex-row justify-end gap-4">
                    <Button className="" variant="secondary" onClick={() => download()}>
                        Download
                    </Button>
                    {saveButton}
                </div>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods
                    contactMethods={resume.contactMethods ?? []}
                    updateContactMethods={updateContactMethods}
                />

                {/* Render ordered components conditionally */}
                {ordering?.map(
                    (item) =>
                        isVisible(item.title) && (
                            <Fragment key={item.title}>{sections[item.title]}</Fragment>
                        ),
                )}
            </div>
        </div>
    );
}
