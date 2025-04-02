import {Button} from './ui/button';
import {enhanceText} from '@/services/enhanceText';
import {AutosizeTextarea} from '@/components/ui/autosize-textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Wand2, Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {BulletPointDisplayView} from '@/layouts/ResumeEditing/BulletPointDisplayView';
import {useToast} from '@/hooks/use-toast';

export function AITextImprovementInput({placeholder, onChange, name, value}) {
    const [aiImprovedText, setAiImprovedText] = useState('');
    const [allowImprovementRequest, setAllowImprovementRequest] = useState(false);
    const [dialogReady, setDialogReady] = useState(false);
    const {toast} = useToast();

    useEffect(() => {
        setAllowImprovementRequest(value?.length >= 30);
    }, [value]);

    const handleButtonClick = async (e) => {
        e.preventDefault();
        if (!allowImprovementRequest) {
            toast({
                title: 'Text is not ready for enhancement',
                description: 'Text must be at least 30 characters long to use AI enhancement.',
                variant: 'destructive',
            });
            return;
        }

        toast({
            title: (
                <div className="flex flex-row gap-2">
                    Enhancing your text...
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                </div>
            ),
            description: 'Our AI is working on improving your content...',
        });

        try {
            const response = await enhanceText(value);
            setAiImprovedText(response);
            setDialogReady(true);
            // toast({
            //     title: 'Enhancement ready ✅',
            //     description: 'Your AI-enhanced text is now available.',
            // });
        } catch (err) {
            console.error(err);
            toast({
                title: 'Enhancement failed',
                description: 'There was an error enhancing your text. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="relative">
            <AutosizeTextarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="times"
            />

            <Dialog open={dialogReady} onOpenChange={setDialogReady}>
                <DialogTrigger asChild>
                    <Button
                        className={
                            'absolute bottom-1 right-1 gap-2 rounded-full p-4 text-lg' +
                            (!allowImprovementRequest ? ' cursor-not-allowed opacity-50' : '')
                        }
                        onClick={handleButtonClick}
                    >
                        <Wand2 />
                        AI
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <div className="flex flex-col gap-3 pb-5">
                            <DialogTitle>Original Text</DialogTitle>
                            <BulletPointDisplayView text={value} />
                        </div>
                        <div className="flex flex-col gap-3 pb-3">
                            <DialogTitle>AI Enhanced Text</DialogTitle>
                            <BulletPointDisplayView text={aiImprovedText} />
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex flex-row justify-end gap-3">
                            <Button
                                variant="destructive"
                                className=""
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDialogReady(false);
                                }}
                            >
                                Discard
                            </Button>
                            <Button
                                className=""
                                variant="default"
                                onClick={(e) => {
                                    console.log(e);
                                    e.stopPropagation();
                                    onChange({target: {name, value: aiImprovedText}});
                                    setDialogReady(false);
                                }}
                            >
                                Accept
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
                <DialogDescription />
            </Dialog>
        </div>
    );
}
