import {useEffect, useState} from 'react';
import {getResumeData} from '@/services';
import uploadResumeData from '@/services/uploadResumeData';

export default function useResumeData(resumeId, USE_API) {
    const [resume, setResume] = useState(null);
    const save = async () => {
        const newResume = await uploadResumeData(resumeId, resume);
        setResume(newResume);
    };
    useEffect(() => {
        const getData = async () => {
            const resumeData = await getResumeData(resumeId, {useApi: USE_API});
            setResume(resumeData);
        };
        getData();
    }, []);
    return {resume: resume, save: save, setResume: setResume};
}
