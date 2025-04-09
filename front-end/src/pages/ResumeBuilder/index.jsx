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
    const resumeHook = useResumeData(resumeId, USE_API);
    if (!resumeHook.resume) return <p>Loading...</p>;

    const saveButton = (
        <Button className="" onClick={resumeHook.save}>
            Save
        </Button>
    );

    return <ResumeEditing saveButton={saveButton} {...resumeHook} />;
}
