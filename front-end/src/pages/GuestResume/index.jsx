import createResume from '@/services/createResume';
import ResumeEditing from '@/layouts/ResumeEditing';
import {GuestSaveDialog} from '@/components/GuestSaveDialog';
import {useGuestResume} from './useGuestResume';

export default function ResumeBuilder() {
    const {resume, ordering, setOrdering, toggleSectionVisibility, updateName, updateContactMethods, updateEducation, updateExperience, updateProjects, updateSkills} = useGuestResume();
    //to be passed into GuestSaveDialog
    const handleSave = async () => {
        try {
            await createResume(resume);
        } catch (error) {
            console.error('Failed to save resume:', error);
        }
    };
    return (
        <ResumeEditing
            resume={resume}
            ordering={ordering}
            setOrdering={setOrdering}
            toggleSectionVisibility={toggleSectionVisibility}
            saveButton={<GuestSaveDialog />}
            updateName={updateName}
            updateContactMethods={updateContactMethods}
            updateEducation={updateEducation}
            updateExperience={updateExperience}
            updateProjects={updateProjects}
            updateSkills={updateSkills}
        />
    );
}
