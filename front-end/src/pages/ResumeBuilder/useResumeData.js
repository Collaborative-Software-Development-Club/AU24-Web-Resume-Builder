import {useEffect} from 'react';
import {getResumeData} from '@/services/getResumeData';
import uploadResumeData from '@/services/uploadResumeData';
import {useResumeBase} from '@/hooks/useResumeBase';

export default function useResumeData(resumeId, useApi) {
    const {resume, setResume, ...rest} = useResumeBase(null);

    const save = async () => {
        try {
            const newResume = await uploadResumeData(resumeId, resume);
            setResume(newResume);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const resumeData = await getResumeData(resumeId, {useApi});
            setResume(resumeData);
        };
        getData();
    }, []);

    return {
        resume,
        save,
        ...rest,
    };
}
