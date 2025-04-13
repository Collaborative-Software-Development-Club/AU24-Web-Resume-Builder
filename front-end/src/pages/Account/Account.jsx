import {useUserResumes} from '../../hooks/useUserResumes';
import ResumePreview from './ResumePreview';
import flags from '@/flags.json';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'; // Add this import
import {CreateResume} from './CreateResume';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const USE_API = flags.useApi;
const DEFAULT_USER_ID = '671992ca81a83b313f050d31';
// const DEFAULT_USER_ID = undefined;

export function Account() {
    const logOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const {resumes, deleteResume, create, queryResult} = useUserResumes(auth.uid, USE_API);
    console.log("auth:", auth)
    console.log(queryResult);

    if (queryResult.isPending) return <p>Loading...</p>;

    if (queryResult.isError) {
        return <p>Failed fetching resumes: {queryResult.error}</p>;
    }

    const createNewResume = create;

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-start gap-10 px-4 pt-10">
            {/* test
            <div className="mb-2 flex items-center gap-4 rounded-lg bg-gray-100 p-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Tempoary Test:</span>
                    <Button
                        variant={mockLoggedIn ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMockLoggedIn(!mockLoggedIn)}
                    >
                        {mockLoggedIn ? 'Logged In' : 'Logged Out'}
                    </Button>
                </div>
                {mockLoggedIn && (
                    <Input
                        type="text"
                        value={mockUsername}
                        onChange={(e) => setMockUsername(e.target.value)}
                        className="h-8 w-40"
                        placeholder="Test username"
                    />
                )}
            </div> */}

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-medium">{`${auth.username}'s Resumes`}</h2>
                    {/* <p className="text-sm text-muted-foreground">Logged in as {auth.username}</p> */}
                </div>
                <Button
                    variant="outline"
                    onClick={() => {
                        logOut();
                        navigate('/');
                    }}
                >
                    Log Out
                </Button>
            </div>

            <div className="grid grid-cols-6 gap-6">
                <CreateResume resumes={resumes} createNewResume={createNewResume} />
                {resumes.map((resume) => (
                    <ResumePreview
                        key={resume.id}
                        resumeId={resume.id}
                        onDelete={deleteResume}
                        {...resume}
                    />
                ))}
            </div>
        </div>
    );
}

export default Account;
