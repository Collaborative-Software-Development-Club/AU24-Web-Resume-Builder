import {useEffect, useState} from 'react';
import {RESUME_QUERIES} from '@/services/resumeQueries';

export function useUserResumes(userId, USE_API) {
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState(null);
    resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    useEffect(() => {
        const getData = async () => {
            try {
                const resumes = await RESUME_QUERIES.getFromUser(userId, {useApi: USE_API});
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
            RESUME_QUERIES.delete(id);
            setResumes((prevResumes) => prevResumes.filter((res) => res.id != id));
        } catch (e) {
            console.error(e);
        }
    };
    return {resumes, deleteResume, error};
}
