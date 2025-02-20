import useUserData from './useUserData';
import createResume from '@/services/createResume';
import uploadResumeToUser from '@/services/uploadResumeToUser';
import {Plus} from 'lucide-react';
import ResumePreview from './ResumePreview';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {DEFAULT_RESUME} from '../../services/DEFAULT_RESUME';

const USE_API = true;
const DEFAULT_USER_ID = '671992ca81a83b313f050d31';

const Account = () => {
    const fetchedUserData = useUserData(DEFAULT_USER_ID, USE_API);
    const navigate = useNavigate();
    const [resumeIds, setResumeIds] = useState([]);

    useEffect(() => {
        if (fetchedUserData) {
            setResumeIds(fetchedUserData.resumesId);
        }
    }, [fetchedUserData]);

    if (!fetchedUserData) return <p>Loading...</p>;

    const createNewResume = async () => {
        try {
            const createdResume = await createResume(DEFAULT_RESUME);
            if (createdResume.id) {
                await uploadResumeToUser(DEFAULT_USER_ID, createdResume.id);
                setResumeIds((prevIds) => [...prevIds, createdResume.id]); // Add the new resume ID to the list
                navigate(`/resume/${createdResume.id}`);
            }
        } catch (error) {
            console.error('Failed to create a new resume:', error);
        }
    };

    const handleDeleteResume = (deletedResumeId) => {
        setResumeIds((prevIds) => prevIds.filter((id) => id !== deletedResumeId));
    };

    return (
        <div className="mx-72 flex w-full flex-col justify-start gap-10">
            <h2 className="text-xl font-medium">Your Resumes</h2>
            <div className="flex flex-row gap-7">
                <button className="flex h-48 w-36 rounded-md border text-gray-700 transition-colors hover:bg-gray-300 hover:text-black hover:shadow-md" onClick={createNewResume}>
                    <Plus className="m-auto" size="55" />
                </button>
                {resumeIds.map((resumeId) => (
                    <ResumePreview key={resumeId} resumeId={resumeId} userId={DEFAULT_USER_ID} onDelete={handleDeleteResume} />
                ))}
            </div>
        </div>
    );
};

export default Account;
