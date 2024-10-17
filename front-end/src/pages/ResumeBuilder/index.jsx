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

        <div className="flex w-full justify-center">
            <div className="items-strech flex w-full max-w-screen-lg flex-col justify-start self-stretch">
                <Sidebar />
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                <Education education={resume.education} />
                <Experiences experiences={resume.experience} />
                <Projects projects={resume.projects} />
                <Skills skills={resume.skills.items} />
            </div>

        </div>
    );
}
