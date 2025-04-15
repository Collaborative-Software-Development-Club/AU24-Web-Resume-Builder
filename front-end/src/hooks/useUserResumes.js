import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useResumeQueries} from './useResumeQueries';

export function useUserResumes(userId) {
    const resumeQueries = useResumeQueries();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => resumeQueries.getFromUser(userId),
    });
    const saveMutation = useMutation({
        mutationFn: (id) => resumeQueries.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
    });
    const deleteResume = saveMutation.mutate;
    const createMutation = useMutation({
        mutationFn: async (resumeId = undefined) => {
            const data = await resumeQueries.create({userId, resumeId});
            return data.id;
        },
        onSuccess: (resumeId) => {
            // console.log('resumeId in create', resumeId);
            navigate(`/resume/${resumeId}`);
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
        onError: (error) => console.error(error),
    });
    const create = () => createMutation.mutate();
    const duplicate = (resumeId) => createMutation.mutate(resumeId);
    const resumes = data;
    if (resumes) {
        resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }
    return {
        resumes,
        deleteResume,
        create,
        duplicate,
        duplicate,
        queryResult: {isError, isPending, error},
    };
}
