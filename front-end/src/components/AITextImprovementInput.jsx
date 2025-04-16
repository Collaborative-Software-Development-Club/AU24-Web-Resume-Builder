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
import {useEnhanceText} from '@/hooks/useEnhanceText.jsx';

export function AITextImprovementInput({placeholder, onChange, name, value}) {
    // const [aiImprovedText, setAiImprovedText] = useState('');
    const {improvedText: aiImprovedText, enhanceText, mutationResult} = useEnhanceText(value);
    const [dialogReady, setDialogReady] = useState(false);

    useEffect(() => {
        if (aiImprovedText && aiImprovedText !== value) setDialogReady(true);
    }, [aiImprovedText]);

    const allowImprovementRequest = value?.length >= 30;

    const onChangeAdapter = (e) => {
        // remove bullet points from the text if they are pasted with bullets from antoher place
        e.target.value = e.target.value
            .replaceAll('• ', '')
            .replaceAll('•', '')
            .replaceAll('- ', '')
            .replaceAll('-', '');
        onChange(e);
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();
        enhanceText(value);
    };

    return (
        <div className="relative">
            <AutosizeTextarea
                name={name}
                value={value}
                onChange={onChangeAdapter}
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
                        {mutationResult.isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Wand2 size={20} />
                        )}
                        AI
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
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
