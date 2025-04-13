import {useEffect} from 'react';
import {RESUME_QUERIES} from '@/services/resumeQueries';
import {useResumeBase} from '@/hooks/useResumeBase';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useToast} from '@/hooks/use-toast';

export default function useResumeData(resumeId, useApi) {
    const {resume, setResume, ...rest} = useResumeBase(null);
    const {toast} = useToast();
    const saveMutation = useMutation({
        mutationFn: () => RESUME_QUERIES.upload(resumeId, resume),
        onSuccess: () => {
            toast({
                title: 'Saved',
                description: 'Your resume has been saved successfully.',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error saving resume',
                description: error.message,
                variant: 'destructive',
            });
        },
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
        saveResult: {
            isPending: saveMutation.isPending,
        },
    };
}
