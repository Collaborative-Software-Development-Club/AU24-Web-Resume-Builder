import createResume from '@/services/createResume';
import ResumeEditing from '@/layouts/ResumeEditing';
import {GuestSaveDialog} from '@/components/GuestSaveDialog';
import {useGuestResume} from './useGuestResume';

export default function ResumeBuilder() {
    const resumeHook = useGuestResume();
    //to be passed into GuestSaveDialog
    const handleSave = async () => {
        try {
            await createResume(resume);
        } catch (error) {
            console.error('Failed to save resume:', error);
        }
    };
    return <ResumeEditing saveButton={<GuestSaveDialog />} {...resumeHook} />;
}
