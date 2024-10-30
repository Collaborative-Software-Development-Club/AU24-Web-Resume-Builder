import {useEffect, useState} from 'react';
import {getResumeData} from '@/services';

export default function useResumeData(resumeId, USE_API) {
    const [resume, setResume] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const resumeData = await getResumeData(resumeId, {useApi: USE_API});
            console.log(resumeData);
            setResume(resumeData);
        };
        getData();
    }, []);
    return resume;
}
