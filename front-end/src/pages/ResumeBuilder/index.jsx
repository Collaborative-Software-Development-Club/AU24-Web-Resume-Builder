import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import useResumeData from './useResumeData';
import {Projects} from './Projects';

const USE_API = false;

export default function ResumeBuilder() {
    const resume = useResumeData(USE_API);
    if (!resume) {
        return <p>Loading...</p>;
    }
    return (
        <div className="items-strech flex flex-col justify-start self-stretch">
            <Name name={resume.name} />
            <ContactMethods contactMethods={resume.contactMethods} />
            <Education education={resume.education} />
            <Skills skills={resume.skills.items} />
            <Projects projects={resume.projects} />
        </div>
    );
}
