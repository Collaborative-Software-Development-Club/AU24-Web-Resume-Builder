import { useUserResumes } from './useUserResumes';
import createResume from '@/services/createResume';
import { Plus } from 'lucide-react';
import ResumePreview from './ResumePreview';
import { useNavigate } from 'react-router-dom';
import flags from '@/flags.json';
import { Button } from '@/components/ui/button';
import { GuestSaveDialog } from '@/components/GuestSaveDialog'; // Import the dialog component

const USE_API = flags.useApi;
const DEFAULT_USER_ID = '671992ca81a83b313f050d31';

export function Account() {
    const navigate = useNavigate();
    const { resumes } = useUserResumes(DEFAULT_USER_ID, USE_API);

    if (!resumes) return <p>Loading...</p>;

    const createNewResume = async () => {
        try {
            const createdResume = await createResume(DEFAULT_USER_ID);
            if (createdResume.id) {
                navigate(`/resume/${createdResume.id}`);
            }
        } catch (error) {
            console.error('Failed to create a new resume:', error);
        }
    };

    const handleDeleteResume = (deletedResumeId) => {
        // TODO: Delete the resume from the server
    };

    return (
        <div className="mx-auto max-w-6xl px-4 flex w-full flex-col justify-start gap-10">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Your Resumes</h2>
                <GuestSaveDialog text="Log In"/>
            </div>
            <div className="grid grid-cols-6 gap-6">
                <button
                    className="flex h-48 w-36 rounded-md border text-gray-700 transition-colors hover:bg-gray-300 hover:text-black hover:shadow-md"
                    onClick={createNewResume}
                >
                    <Plus className="m-auto" size="55" />
                </button>
                {resumes.map((resume) => (
                    <ResumePreview
                        key={resume.id}
                        resumeId={resume.id}
                        userId={DEFAULT_USER_ID}
                        onDelete={handleDeleteResume}
                    />
                ))}
            </div>
        </div>
    );
}
