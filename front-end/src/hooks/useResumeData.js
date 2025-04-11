import {useEffect} from 'react';
import {RESUME_QUERIES} from '@/services/resumeQueries';
import uploadResumeData from '@/services/uploadResumeData';
import {useResumeBase} from '@/hooks/useResumeBase';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export default function useResumeData(resumeId, useApi) {
    const {resume, setResume, ...rest} = useResumeBase(null);
    const saveMutation = useMutation({
        mutationFn: () => uploadResumeData(resumeId, resume),
    });
    const save = saveMutation.mutate;
    const {data, isLoading, isError, error} = useQuery({
        queryFn: () => RESUME_QUERIES.getOne(resumeId, {useApi}),
        queryKey: ['resume', resumeId],
    });

    useEffect(() => {
        setResume(data);
    }, [data]);
    // this is because isLoading is set to false even when resume is still null
    const isLoadingOverride = isLoading || !resume;

    return {
        resume,
        save,
        ...rest,
        queryResult: {
            isLoading: isLoadingOverride,
            isError,
            error,
        },
    };
}
