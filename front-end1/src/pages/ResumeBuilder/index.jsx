import { useRef } from 'react';
import { Name } from './Name';
import Education from './Education';
import { ContactMethods } from './ContactMethods';
import Skills from './Skills';
import useResumeData from './useResumeData';
import { Projects } from './Projects';
import { Experiences } from './Experiences';
// import DownloadButton from '@/components/DonwloadButton';

const USE_API = false;

export default function ResumeBuilder() {
    const resume = useResumeData(USE_API);
    const resumeRef = useRef(null);  // Create a ref for the resume content

    if (!resume) {
        return <p>Loading...</p>;
    }

    return (
        <div className="items-stretch flex flex-col justify-start self-stretch p-8">
            {/* Attach the ref to the part of the DOM that should be converted to PDF */}
            <div ref={resumeRef}>
                <Name name={resume.name} />
                <ContactMethods contactMethods={resume.contactMethods} />
                <Education education={resume.education} />
                <Experiences experiences={resume.experience} />
                <Skills skills={resume.skills.items} />
                <Projects projects={resume.projects} />
            </div>

            {/* Pass the ref as a prop to the DownloadButton
            <div className="mt-8 self-center">
                <DownloadButton targetRef={resumeRef} />
            </div> */}
        </div>
    );
}
