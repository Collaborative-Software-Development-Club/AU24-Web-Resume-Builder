import {enhanceText as enhanceTextQuery} from '@/services/enhanceText';
import {useMutation} from '@tanstack/react-query';
import {Loader2} from 'lucide-react';
import {useState} from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {useToast} from './use-toast';

export function useEnhanceText() {
    const {toast, dismiss} = useToast();
    const [improvedText, setImprovedText] = useState(null);
    const authHeader = useAuthHeader();
    const mutation = useMutation({
        mutationFn: (text) => enhanceTextQuery(text, authHeader),
        onSuccess: (data) => {
            dismiss();
            setImprovedText(data);
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: 'Enhancement failed',
                description: 'There was an error enhancing your text. Please try again.',
                variant: 'destructive',
            });
        },
        onMutate: () => {
            toast({
                title: (
                    <div className="flex flex-row gap-2">
                        Enhancing your text...
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    </div>
                ),
                description: 'Our AI is working on improving your content...',
            });
        },
    });
    const enhanceText = (text) => {
        if (text?.length >= 30) {
            mutation.mutate(text);
        }
        toast({
            title: 'Text is not ready for enhancement',
            description: 'Text must be at least 30 characters long to use AI enhancement.',
            variant: 'destructive',
        });
    };
    return {
        improvedText,
        enhanceText: enhanceText,
        mutationResult: {
            isLoading: mutation.isPending,
            isError: mutation.isError,
            error: mutation.error,
            isSuccess: mutation.isSuccess,
        },
    };
}
