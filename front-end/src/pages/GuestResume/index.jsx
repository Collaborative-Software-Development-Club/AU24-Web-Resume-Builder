import ResumeEditing from '@/layouts/ResumeEditing';
import {LogInDialog} from '@/components/LogInDialog';
import {useGuestResume} from './useGuestResume';

export default function ResumeBuilder() {
    const resumeHook = useGuestResume();
    return <ResumeEditing saveButton={<LogInDialog />} {...resumeHook} />;
}
