import {RESUME_QUERIES} from '@/services/resumeQueries';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';

export function useUserResumes(userId) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => RESUME_QUERIES.getFromUser(userId),
    });
    const saveMutation = useMutation({
        mutationFn: (id) => RESUME_QUERIES.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
    });
    const deleteResume = saveMutation.mutate;
    const createMutation = useMutation({
        mutationFn: async (resumeId = undefined) => {
            const data = await RESUME_QUERIES.create({userId, resumeId});
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
