import {useState} from 'react';
import {Link} from 'react-router-dom';
import {FileText, Download, Pencil, Clock} from 'lucide-react';
import Delete from '@/components/Delete';
import {Button, buttonVariants} from '@/components/ui/button';
import {Card, CardDescription, CardTitle} from '@/components/ui/card';
import {formatDistanceToNow} from 'date-fns';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';

export default function ResumePreview({resumeId, onDelete, description, lastModified}) {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const downloadResume = () => {};

    const deleteResume = async () => {
        try {
            onDelete(resumeId);
        } catch (error) {
            console.error('Failed to delete resume:', error);
        }
    };

    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip open={isTooltipOpen || isDeleteDialogOpen} onOpenChange={setIsTooltipOpen}>
                <TooltipTrigger asChild>
                    <Card className="flex h-48 w-40 flex-col gap-4 p-4 hover:opacity-50">
                        <FileText className="h-full w-full text-gray-700" />
                        <CardTitle className="text-left">{description}</CardTitle>
                        <CardDescription className="flex items-start gap-2 text-left text-xs">
                            <Clock className="" />
                            <span>
                                Updated{' '}
                                {formatDistanceToNow(new Date(lastModified), {addSuffix: true})}
                            </span>
                        </CardDescription>
                        {/* <div className="absolute inset-0 z-10 flex items-center justify-center gap-1 rounded-md bg-gray-400 bg-opacity-50 text-center text-black opacity-0 transition-opacity duration-300 hover:opacity-100">
            </div> */}
                    </Card>
                </TooltipTrigger>
                <TooltipContent
                    align="center"
                    sideOffset={-100}
                    className="flex flex-row gap-2 bg-transparent [&>*]:shadow-md"
                >
                    <Link
                        to={`/resume/${resumeId}`}
                        className={buttonVariants({variant: 'default'})}
                    >
                        <Pencil className="text-white" />
                    </Link>
                    <Button variant="outline" onClick={downloadResume}>
                        <Download className="text-accent-foreground" />
                    </Button>
                    <Delete
                        action={deleteResume}
                        onOpenChange={(open) => {
                            setIsDeleteDialogOpen(open);
                        }}
                    />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
