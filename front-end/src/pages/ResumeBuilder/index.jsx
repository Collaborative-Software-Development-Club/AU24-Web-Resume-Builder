import useResumeData from './useResumeData';
import {useParams} from 'react-router-dom';
import ResumeEditing from '@/layouts/ResumeEditing';
import {Button} from '@/components/ui/button';
import flags from '@/flags.json';

const USE_API = flags.useApi;

export default function ResumeBuilder() {
    const resumeId = useParams()?.resumeId;
    if (resumeId == undefined) {
        throw new Error('resumeId is undefined');
    }
    const {
        resume,
        save,
        toggleSectionVisibility,
        updateOrderOfSections,
        updateName,
        updateContactMethods,
        updateEducation,
        updateExperience,
        updateProjects,
        updateSkills,
    } = useResumeData(resumeId, USE_API);
    if (!resume) return <p>Loading...</p>;

    const saveButton = (
        <Button className="" onClick={save}>
            Save
        </Button>
    );

    return (
        <ResumeEditing
            resume={resume}
            updateOrderOfSections={updateOrderOfSections}
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
