import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {useResumeQueries} from './useResumeQueries';
import {parseResume} from '@/services/parseResume';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

export function useUserResumes(userId) {
    const resumeQueries = useResumeQueries();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const redirectAndInvalidate = (resumeId) => {
        queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        navigate(`/resume/${resumeId}`);
    };
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['resumes', userId],
        queryFn: () => resumeQueries.getFromUser(userId),
    });
    const deleteMutation = useMutation({
        mutationFn: (id) => resumeQueries.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['resumes', userId]});
        },
    });
    const createFromFile = async (file) => {
        const parsedData = await parseResume(file, authHeader);
        const createdData = await resumeQueries.create({userId});
        const resumeId = createdData.id;
        parsedData.id = resumeId;
        parsedData.userId = userId;
        const newData = await resumeQueries.upload(resumeId, parsedData);
        return newData;
    };
    const createMutation = useMutation({
        mutationFn: async ({resumeId, file}) => {
            // console.log('creating resume', creationType, params);
            if (file) {
                const data = await createFromFile(file);
                return data.id;
            }
            const data = await resumeQueries.create({userId, resumeId});
        },
        onSuccess: redirectAndInvalidate,
        onError: (error) => console.error(error),
    });
    const resumes = data;
    if (resumes) {
        resumes.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }

    return {
        resumes,
        deleteResume: deleteMutation.mutate,
        create: () => createMutation.mutate({}),
        createFromFile: (file) => {
            createMutation.mutate({file});
        },
        duplicate: (resumeId) => createMutation.mutate({resumeId}),
        queryResult: {isError, isPending, error},
        createResult: {
            isPending: createMutation.isPending,
            isError: createMutation.isError,
            error: createMutation.error,
        },
    };
}
