import {Card, CardDescription, CardTitle} from '@/components/ui/card';
import {ResumePreview} from './ResumePreview';
import {FileText, Clock} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

export function ResumeList({queryStatus, resumes, deleteResume}) {
    if (queryStatus.isPending) {
        return <ResumeListSkeleton />;
    }
    if (queryStatus.isError) {
        return <p>Error loading resumes: {queryStatus.error.message}</p>;
    }
    return resumes.map((resume) => (
        <ResumePreview key={resume.id} resumeId={resume.id} onDelete={deleteResume} {...resume} />
    ));
}

function ResumeListSkeleton() {
    return new Array(3).fill(0).map((_, index) => (
        <Card className="flex h-48 w-40 flex-col gap-4 p-4" key={index}>
            <FileText className="h-full w-full text-gray-700" />
            <CardTitle>
                <Skeleton className="h-6 w-full" />
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-left text-xs">
                <Clock className="" />
                <Skeleton className="h-4 w-full" />
            </CardDescription>
        </Card>
    ));
}
