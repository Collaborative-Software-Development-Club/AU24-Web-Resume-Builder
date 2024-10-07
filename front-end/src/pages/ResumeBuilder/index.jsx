import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import {Sidebar} from './Sidebar';
import useResumeData from './useResumeData';

const USE_API = false;

export default function ResumeBuilder() {
    const resume = useResumeData(USE_API);
    if (!resume) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            
            <div className="items-strech flex flex-col justify-start self-stretch grow">
                <Sidebar />
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                <Education />
                <Skills skills={resume.skills.items} />
            </div>
        </div>
    );
}
