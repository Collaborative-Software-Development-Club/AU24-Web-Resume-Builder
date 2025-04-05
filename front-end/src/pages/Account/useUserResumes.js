import {useEffect, useState} from 'react';
import {getUserResumes} from '@/services/getUserResumes';
import deleteResumeData from '@/services/deleteResumeData';

export function useUserResumes(userId, USE_API) {
    const [resumes, setResumes] = useState([]);
    resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    useEffect(() => {
        const getData = async () => {
            const resumes = await getUserResumes(userId, {useApi: USE_API});
            // console.log(resumes);
            setResumes(resumes);
        };
        getData();
    }, []);
    const deleteResume = (id) => {
        setResumes((prevResumes) => prevResumes.filter((res) => res.id != id));
        deleteResumeData(id);
    };
    return {resumes, deleteResume};
}
