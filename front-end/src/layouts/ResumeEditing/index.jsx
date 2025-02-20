import {downloadResume} from '@/services/downloadResume';
import {Button} from '@/components/ui/button';
import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import Sidebar from './Sidebar';
import {Projects} from './Projects';
import {Experiences} from './Experiences';
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
    // Helper function to check visibility
    const isVisible = (title) => resume?.[title.toLowerCase()]?.visible;
    // Map of components for easy rendering
    console.log('resume in ResumeEditing', resume);
    const components = {
        EDUCATION: <Education updateEducation={updateEducation} education={resume.education} />,
        EXPERIENCE: <Experiences updateExperience={updateExperience} experiences={resume.experience.items} />,
        PROJECTS: <Projects updateProjects={updateProjects} projects={resume.projects.items} />,
        SKILLS: <Skills updateSkills={updateSkills} skills={resume.skills.items} />,
    };
    return (
        <div className="flex justify-center pb-20 sm:mx-10">
            <div className="flex w-full max-w-6xl flex-col items-stretch justify-start self-stretch">
                {/* Sidebar to control visibility and ordering */}
                <Sidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility} />

                {/* Static components */}
                <div className="flex flex-row justify-end gap-4">
                    <Button className="" variant="secondary" onClick={() => download()}>
                        Download
                    </Button>
                    {saveButton}
                </div>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods contactMethods={resume.contactMethods} updateContactMethods={updateContactMethods} />

                {/* Render ordered components conditionally */}
                {ordering?.map((item) => isVisible(item.title) && <div key={item.id}>{components[item.title]}</div>)}
            </div>
        </div>
    );
}
