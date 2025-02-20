import useResumeData from './useResumeData';
import {useParams} from 'react-router-dom';
import ResumeEditing from '@/layouts/ResumeEditing';
import {Button} from '@/components/ui/Button';

const USE_API = false;

export default function ResumeBuilder() {
    const resumeId = useParams()?.resumeId;
    if (resumeId == undefined) {
        throw new Error('resumeId is undefined');
    }
    const {resume, save, ordering, setOrdering, toggleSectionVisibility, updateName, updateContactMethods, updateEducation, updateExperience, updateProjects, updateSkills} = useResumeData(
        resumeId,
        USE_API,
    );
    if (!resume) return <p>Loading...</p>;
    console.log('Resume:');
    console.log({property: 'value'});
    console.log(resume);
    console.log(resume.education);

    const saveButton = (
        <Button className="" onClick={save}>
            Save
        </Button>
    );

    return (
        <ResumeEditing
            resume={resume}
            ordering={ordering}
            setOrdering={setOrdering}
            toggleSectionVisibility={toggleSectionVisibility}
            saveButton={saveButton}
            updateName={updateName}
            updateContactMethods={updateContactMethods}
            updateEducation={updateEducation}
            updateExperience={updateExperience}
            updateProjects={updateProjects}
            updateSkills={updateSkills}
        />
    );
}
