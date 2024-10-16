import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import {Sidebar} from './Sidebar';
import useResumeData from './useResumeData';
import {Projects} from './Projects';
import {Experiences} from './Experiences';

const USE_API = false;

export default function ResumeBuilder() {
    const resume = useResumeData(USE_API);
    if (!resume) {
        return <p>Loading...</p>;
    }
    return (
<<<<<<< HEAD

        <div className="flex w-full justify-center">
            <div className="items-strech flex w-full max-w-screen-lg flex-col justify-start self-stretch">
                <Sidebar />
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                <Education education={resume.education} />
                <Projects projects={resume.projects} />
                <Skills skills={resume.skills.items} />
            </div>

=======
        <div className="items-strech flex flex-col justify-start self-stretch">
            <Name name={resume.name} />
            <ContactMethods contactMethods={resume.contactMethods} />
            <Education education={resume.education} />
            <Experiences experiences={resume.experience} />
            <Skills skills={resume.skills.items} />
            <Projects projects={resume.projects} />
>>>>>>> 8a5a7c7c253a03fc1399a149b88c54df4182fb44
        </div>
    );
}
