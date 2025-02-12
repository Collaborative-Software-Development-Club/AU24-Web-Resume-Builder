import {useEffect, useState} from 'react';
import {getResumeData} from '@/services/getResumeData';
import uploadResumeData from '@/services/uploadResumeData';

export default function useResumeData(resumeId, useApi) {
    const [resume, setResume] = useState(null);
    const save = async () => {
        const newResume = await uploadResumeData(resumeId, resume);
        setResume(newResume);
    };
    useEffect(() => {
        const getData = async () => {
            const resumeData = await getResumeData(resumeId, {useApi: useApi});
            setResume(resumeData);
        };
        getData();
    }, []);
    return {resume: resume, save: save, setResume: setResume};
}
