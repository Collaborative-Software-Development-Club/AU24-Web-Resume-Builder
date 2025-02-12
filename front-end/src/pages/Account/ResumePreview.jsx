import { Link } from 'react-router-dom';
import { FileText, Download, Pencil } from 'lucide-react';
import Delete from '@/components/Delete';
import { Button } from '@/components/ui/button';
import deleteResumeData from '@/services/deleteResumeData';
import deleteResumeFromUser from '@/services/deleteResumeFromUser';

export default function ResumePreview({ resumeId, userId, onDelete }) {
    const downloadResume = () => {};

    const deleteResume = async () => {
        try {
            await deleteResumeFromUser(userId, resumeId);
            await deleteResumeData(resumeId);
            onDelete(resumeId); // Call the onDelete function with the deleted resume ID
        } catch (error) {
            console.error('Failed to delete resume:', error);
        }
    };

    return (
        <div className="relative h-48 w-36 rounded-md border transition-colors hover:bg-gray-300 hover:shadow-md">
            <FileText className="h-full w-full object-cover text-gray-700 hover:text-gray-400" />
            <div className="absolute inset-0 z-10 flex items-center justify-center gap-1 rounded-md bg-gray-400 bg-opacity-50 text-center text-black opacity-0 transition-opacity duration-300 hover:opacity-100">
                <Link to={`/resume/${resumeId}`}>
                    <Button className="bg-secondary text-black hover:text-secondary">
                        <Pencil />
                    </Button>
                </Link>
                <Button className="bg-secondary text-black hover:text-secondary" onClick={downloadResume}>
                    <Download />
                </Button>
                <Delete action={deleteResume} />
            </div>
        </div>
    );
}
