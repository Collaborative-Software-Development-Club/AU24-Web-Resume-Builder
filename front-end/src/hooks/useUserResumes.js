import {RESUME_QUERIES} from '@/services/resumeQueries';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

export function useUserResumes(userId, USE_API) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => RESUME_QUERIES.getFromUser(userId, {useApi: USE_API}),
    });
    const saveMutation = useMutation({
        mutationFn: (id) => RESUME_QUERIES.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
    });
    const deleteResume = saveMutation.mutate;
    const createMutation = useMutation({
        mutationFn: async () => {
            const data = await RESUME_QUERIES.create(userId);
            return data.id;
        },
        onSuccess: (resumeId) => {
            console.log('resumeId in create', resumeId);
            navigate(`/resume/${resumeId}`);
        },
        onError: (error) => console.log(error),
    });
    const create = createMutation.mutate;
    const resumes = data;
    if (resumes) {
        resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }
    return {resumes, deleteResume, create, queryResult: {isError, isPending, error}};
}
