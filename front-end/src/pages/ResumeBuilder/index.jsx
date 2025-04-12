import useResumeData from '../../hooks/useResumeData';
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
    console.log(resumeHook);
    if (resumeHook.queryResult.isLoading) return <p>Loading...</p>;
    if (resumeHook.queryResult.isError)
        return <p>There was an error loading the resume {resumeHook.queryResult.error.message}</p>;

    const saveButton = (
        <Button className="" onClick={resumeHook.save}>
            Save
        </Button>
    );

    return <ResumeEditing saveButton={saveButton} {...resumeHook} />;
}
