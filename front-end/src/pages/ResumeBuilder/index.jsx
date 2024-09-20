import jsonData from '@/../../data/resume.json';
import {Name} from './Name';
import {ContactMethods} from './ContactMethods'
import Skills from './Skills';
export default function ResumeBuilder() {
    console.log(jsonData);
    const name = jsonData.name;
    const contactMethods = jsonData.contact_methods;
    return (
        <div className="flex flex-col items-center justify-start">
            <Name name={name} />
            <ContactMethods contactMethods={contactMethods} />
            <Skills />
        </div>
    )
}
