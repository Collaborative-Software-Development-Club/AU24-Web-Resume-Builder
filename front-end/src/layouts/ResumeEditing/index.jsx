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
    toggleSectionVisibility,
    saveButton,
    updateOrderOfSections,
    updateName,
    updateContactMethods,
    updateEducation,
    updateExperience,
    updateProjects,
    updateSkills,
    updateDescription,
}) {
    console.log('resume in ResumeEditing: ', resume);
    const download = () => {
        downloadResume(resume);
    };
    // Helper function to check visibility
    const isVisible = (title) => {
        const section = resume[title.toLowerCase()];
        // TODO this currently does not handle sections where the value of the enum resume.orderOfSections isn't the same spelling as the section name in the resume object
        return section?.visible;
    };
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
    console.log('resume editing updateDescription: ', updateDescription);
    return (
        <div className="flex justify-center pb-20 sm:mx-10">
            {/* Sidebar to control visibility and ordering */}
            <Sidebar
                resume={resume}
                ordering={resume.orderOfSections}
                setOrdering={updateOrderOfSections}
                setDescription={updateDescription}
                toggleSectionVisibility={toggleSectionVisibility}
            >
                <div className="flex w-full flex-col items-center">
                    <div className="w-full max-w-5xl">
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
                        {resume.orderOfSections?.map(
                            (sectionId) =>
                                isVisible(sectionId) && (
                                    <Fragment key={sectionId}>{sections[sectionId]}</Fragment>
                                ),
                        )}
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}
