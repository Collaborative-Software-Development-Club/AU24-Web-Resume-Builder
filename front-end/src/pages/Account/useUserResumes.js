import {useEffect, useState} from 'react';
import {getUserResumes} from '@/services/getUserResumes';

export function useUserResumes(userId, USE_API) {
    const [resumes, setResumes] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const resumes = await getUserResumes(userId, {useApi: USE_API});
            // console.log(resumes);
            setResumes(resumes);
        };
        getData();
    }, []);
    return {resumes};
}
