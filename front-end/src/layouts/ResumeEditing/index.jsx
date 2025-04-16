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
import {Download} from 'lucide-react';
import {SectionTitle} from './SectionTitle';

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
            <>
                <SectionTitle
                    title="Education"
                    hide={() => toggleSectionVisibility('education', false)}
                />
                <Education updateEducation={updateEducation} education={resume.education.content} />
            </>
        ),
        EXPERIENCE: (
            <>
                <SectionTitle
                    title="Experience"
                    hide={() => toggleSectionVisibility('experience', false)}
                />
                <Experiences
                    updateExperience={updateExperience}
                    experiences={resume.experience.content}
                />
            </>
        ),
        PROJECTS: (
            <>
                <SectionTitle
                    title="Projects"
                    hide={() => toggleSectionVisibility('projects', false)}
                />
                <Projects updateProjects={updateProjects} projects={resume.projects.content} />
            </>
        ),
        SKILLS: (
            <>
                <SectionTitle
                    title="Skills"
                    hide={() => toggleSectionVisibility('skills', false)}
                />
                <Skills updateSkills={updateSkills} skills={resume.skills.content ?? []} />
            </>
        ),
    };
    return (
        <Sidebar
            resume={resume}
            ordering={resume.orderOfSections}
            setOrdering={updateOrderOfSections}
            setDescription={updateDescription}
            toggleSectionVisibility={toggleSectionVisibility}
        >
            <div className="flex w-full flex-col gap-4 p-4 px-10">
                <div className="flex flex-row justify-end gap-2">
                    <Button
                        className="gap-2"
                        variant="ghost"
                        size="icon"
                        onClick={() => download()}
                    >
                        <Download />
                    </Button>
                    {saveButton}
                </div>
                <div className="mx-auto w-full max-w-5xl rounded-sm bg-white p-8">
                    <Name name={resume.name} updateName={updateName} />
                    <ContactMethods
                        contactMethods={resume.contactMethods ?? []}
                        updateContactMethods={updateContactMethods}
                    />

                    {resume.orderOfSections?.map(
                        (sectionId) =>
                            isVisible(sectionId) && (
                                <Fragment key={sectionId}>{sections[sectionId]}</Fragment>
                            ),
                    )}
                </div>
            </div>
        </Sidebar>
    );
}
