import ResumeEditing from '@/layouts/ResumeEditing';
import {LogInDialog} from './LogInDialog';
import {useGuestResume} from '@/hooks/useGuestResume';

export default function GuestResume() {
    const resumeHook = useGuestResume();
    return <ResumeEditing saveButton={<LogInDialog />} {...resumeHook} />;
}
