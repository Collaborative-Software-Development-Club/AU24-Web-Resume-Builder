import {useEffect, useState} from 'react';
import {getUserResumes} from '@/services/getUserResumes';
import deleteResumeData from '@/services/deleteResumeData';

export function useUserResumes(userId, USE_API) {
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState(null);
    resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    useEffect(() => {
        const getData = async () => {
            try {
                const resumes = await getUserResumes(userId, {useApi: USE_API});
                setResumes(resumes);
            } catch (e) {
                console.error(e);
                setError(e.toString());
            }
        };
        getData();
    }, []);
    const deleteResume = (id) => {
        try {
            deleteResumeData(id);
            setResumes((prevResumes) => prevResumes.filter((res) => res.id != id));
        } catch (e) {
            console.error(e);
        }
    };
    return {resumes, deleteResume, error};
}
