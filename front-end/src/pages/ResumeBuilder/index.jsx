import {Name} from './Name';
import Education from './Education';
import {ContactMethods} from './ContactMethods';
import Skills from './Skills';
import {Sidebar} from './Sidebar';
import useResumeData from './useResumeData';
import {Projects} from './Projects';
import {Experiences} from './Experiences';
import {Button} from '@/components/ui/button';

const USE_API = true;
const DEFAULT_RESUME_ID = '6718101a6929694694c9f0b7';

export default function ResumeBuilder() {
    const {resume, save, setResume} = useResumeData(DEFAULT_RESUME_ID, USE_API);
    if (!resume) {
        return <p>Loading...</p>;
    }
    console.log('on ResumeBuilder page', resume);
    const updateName = (name) => {
        setResume({...resume, name: name});
    };
    return (
        <div className="flex justify-center">
            <div className="items-strech flex flex-col justify-start self-stretch">
                <Sidebar />
                <Button className="self-end" onClick={save}>
                    Save
                </Button>
                <Name name={resume.name} updateName={updateName} />
                <ContactMethods contactMethods={resume.contactMethods} />
                <Education education={resume.education} />
                <Experiences experiences={resume.experience} />
                <Projects projects={resume.projects} />
                <Skills skills={resume.skills.items} />
            </div>
        </div>
    );
}
