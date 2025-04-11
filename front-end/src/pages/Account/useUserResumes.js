import {RESUME_QUERIES} from '@/services/resumeQueries';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export function useUserResumes(userId, USE_API) {
    const queryClient = useQueryClient();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => RESUME_QUERIES.getFromUser(userId, {useApi: USE_API}),
    });
    const mutation = useMutation({
        mutationFn: (id) => RESUME_QUERIES.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
    });
    const deleteResume = mutation.mutate;
    const resumes = data;
    if (resumes) {
        resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }
    return {resumes, deleteResume, queryResult: {isError, isPending, error}};
}
