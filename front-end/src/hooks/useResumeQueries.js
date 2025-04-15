import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {resumeQueries} from '@/services/resumeQueries';

export function useResumeQueries() {
    const authHeader = useAuthHeader();
    return resumeQueries(authHeader);
}
