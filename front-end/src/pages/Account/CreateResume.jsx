import {useState} from 'react';
import {Plus} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {formatDistanceToNow} from 'date-fns';

export function CreateResume({resumes, createNewResume, duplicateResume}) {
    const [selectedOption, setSelectedOption] = useState('option-one');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [copyIndex, setcopyIndex] = useState(null);

    const handleProceed = () => {
        console.log(selectedOption);
        switch (selectedOption) {
            case 'option-one':
                console.log('opiton-one-called');
                createNewResume();
                break;
            case 'option-two':
                duplicateResume(resumes[copyIndex].id);
                break;
            case 'option-three':
                //TODO: implement file upload and its create function
                throw new Error('Option for creating resume not supported');
                break;
            default:
                createNewResume({});
        }
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <button className="flex h-48 w-40 rounded-md border text-gray-700 transition-colors hover:bg-gray-300 hover:text-black hover:shadow-md">
                    <Plus className="m-auto" size="55" />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Set Up Your Resume</DialogTitle>
                </DialogHeader>

                <RadioGroup
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                    className="text-gray-500"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" className="h-5 w-5" />
                        <Label htmlFor="option-one" className="text-lg">
                            Create New Resume
                        </Label>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="option-two"
                                id="option-two"
                                className="h-5 w-5"
                            />
                            <Label htmlFor="option-two" className="text-lg">
                                Copy Existing Resume
                            </Label>
                        </div>
                        {selectedOption !== 'option-two' ? (
                            ''
                        ) : (
                            <div className="flex flex-col gap-1">
                                <h1 className="text-base">Choose a Resume to Copy From</h1>
                                <div className="max-h-96 w-full rounded-sm border">
                                    {resumes?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`flex flex-row items-center justify-between rounded-sm px-2 transition hover:bg-gray-200 ${
                                                    copyIndex === index ? 'bg-gray-200' : ''
                                                }`}
                                                onClick={() => {
                                                    console.log(index);
                                                    setcopyIndex(index);
                                                }}
                                            >
                                                <p className="text-base">{item.description}</p>
                                                <p className="font-light">
                                                    {'Updated ' +
                                                        formatDistanceToNow(
                                                            new Date(item.lastModified),
                                                            {addSuffix: true},
                                                        )}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="option-three"
                                id="option-three"
                                className="h-5 w-5"
                            />
                            <Label htmlFor="option-three" className="text-lg">
                                Import from PDF/Word
                            </Label>
                        </div>
                        {selectedOption !== 'option-three' ? (
                            ''
                        ) : (
                            <div>
                                <h1>Upload Your Resume</h1>
                            </div>
                        )}
                    </div>
                </RadioGroup>
                <DialogDescription />
                <DialogFooter>
                    <Button onClick={handleProceed}>Proceed</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
