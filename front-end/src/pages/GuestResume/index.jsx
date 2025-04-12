import ResumeEditing from '@/layouts/ResumeEditing';
import {GuestSaveDialog} from '@/components/GuestSaveDialog';
import {useGuestResume} from '../../hooks/useGuestResume';

export default function ResumeBuilder() {
    const resumeHook = useGuestResume();
    return <ResumeEditing saveButton={<GuestSaveDialog />} {...resumeHook} />;
}
