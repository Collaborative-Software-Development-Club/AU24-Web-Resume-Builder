import {Fragment, useState} from 'react';
import {Clock, CopyPlus, FilePenLine, FileText, FileUp, Loader2, Plus} from 'lucide-react';
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
import {Input} from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export function CreateResume({
    resumes,
    createNewResume,
    duplicateResume,
    createFromFile,
    createResult,
}) {
    const [resumeToCopyId, setResumeToCopyId] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };
    const options = [
        {
            id: 'scratch',
            description:
                'Existing data from your education, name, and contact information will be used.',
            label: 'From Scratch',
            icon: <FilePenLine className="text-primary" />,
            action: createNewResume,
            form: null,
        },
        {
            id: 'duplicate',
            label: 'Copy Existing Resume',
            description: 'Create a new resume by duplicating an existing one.',
            icon: <CopyPlus className="text-primary" />,
            action: () => duplicateResume(resumeToCopyId),
            form: (
                <>
                    <DialogDescription className="">Choose a Resume to Copy From</DialogDescription>
                    <RadioGroup
                        className="flex flex-col items-stretch"
                        value={resumeToCopyId}
                        onValueChange={setResumeToCopyId}
                    >
                        <Carousel
                            className="flex flex-row items-center gap-2"
                            opts={{
                                align: 'start',
                            }}
                        >
                            <CarouselPrevious className="" />
                            <CarouselContent>
                                {resumes?.map((item, index) => {
                                    return (
                                        <CarouselItem key={item.id} className="basis-auto">
                                            <RadioGroupItem
                                                className="sr-only"
                                                value={item.id}
                                                id={item.id}
                                                name={item.id}
                                            />
                                            <Label htmlFor={item.id} className="">
                                                <Card
                                                    className={cn(
                                                        'flex h-48 w-40 flex-col gap-4 p-4',
                                                        resumeToCopyId == item.id &&
                                                            'border-2 border-primary',
                                                    )}
                                                >
                                                    <FileText className="h-full w-full text-gray-700" />
                                                    <CardTitle className="text-left">
                                                        {item.description}
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center gap-2 text-left text-xs">
                                                        <Clock className="" />
                                                        <span>
                                                            Updated{' '}
                                                            {formatDistanceToNow(
                                                                new Date(item.lastModified),
                                                                {
                                                                    addSuffix: true,
                                                                },
                                                            )}
                                                        </span>
                                                    </CardDescription>
                                                </Card>
                                            </Label>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <CarouselNext className="" />
                        </Carousel>
                    </RadioGroup>
                </>
            ),
        },
        {
            id: 'import',
            label: 'Import',
            description: 'Upload a resume file to import your data.',
            icon: <FileUp className="text-primary" />,
            action: () => {
                createFromFile(uploadedFile);
            },
            form: (
                <div>
                    <CardDescription>Upload Your Resume</CardDescription>
                    <div className="">
                        <Label htmlFor="resume">Your resume</Label>
                        <Input id="resume" type="file" onChange={handleFileUpload} accept=".pdf" />
                    </div>
                </div>
            ),
        },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0].id);

    const handleProceed = () => {
        options.find((option) => option.id === selectedOption).action();
    };

    const notAllowedToProceed =
        (selectedOption === 'duplicate' && !resumeToCopyId) ||
        (selectedOption == 'import' && !uploadedFile);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex h-48 w-40 rounded-2xl border bg-white/50 transition-colors hover:bg-gray-100 hover:shadow-md">
                    <Plus className="m-auto" size="55" />
                </button>
            </DialogTrigger>
            <DialogContent className="flex max-w-2xl flex-col">
                <DialogHeader>
                    <DialogTitle>Set Up Your Resume</DialogTitle>
                </DialogHeader>

                <RadioGroup
                    value={selectedOption}
                    onValueChange={setSelectedOption}
                    className="flex flex-row"
                >
                    {options.map((option) => (
                        <Fragment key={option.id}>
                            <RadioGroupItem
                                value={option.id}
                                id={option.id}
                                name={option.id}
                                className="sr-only"
                            />
                            <Label htmlFor={option.id}>
                                <Card
                                    className={cn(
                                        'flex h-full w-48 flex-col justify-start p-1',
                                        selectedOption == option.id && 'border-2 border-primary',
                                    )}
                                >
                                    <CardHeader>{option.icon}</CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-base">{option.label}</CardTitle>
                                        <CardDescription className="text-xs">
                                            {option.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Label>
                        </Fragment>
                    ))}
                </RadioGroup>
                {options.find((option) => option.id === selectedOption).form}
                <DialogDescription />
                <DialogFooter>
                    <Button
                        onClick={handleProceed}
                        disabled={notAllowedToProceed || createResult.isPending}
                    >
                        {createResult.isPending && <Loader2 className="animate-spin" />}
                        {createResult.isPending ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
