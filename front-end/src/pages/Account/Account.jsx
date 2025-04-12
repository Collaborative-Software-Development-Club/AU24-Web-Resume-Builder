import {useState} from 'react';
import {useUserResumes} from '../../hooks/useUserResumes';
import flags from '@/flags.json';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'; // Add this import
import {GuestSaveDialog} from '@/components/GuestSaveDialog';
import {CreateResume} from './CreateResume';
import {ResumeList} from './ResumeList';

const USE_API = flags.useApi;
const DEFAULT_USER_ID = '671992ca81a83b313f050d31';
// const DEFAULT_USER_ID = undefined;

export function Account() {
    const {
        resumes,
        deleteResume,
        create: createNewResume,
        duplicate: duplicateResume,
        queryResult,
    } = useUserResumes(DEFAULT_USER_ID, USE_API);

    // Temporary testing state
    const [mockLoggedIn, setMockLoggedIn] = useState(false);
    const [mockUsername, setMockUsername] = useState('test_user');

    console.log(queryResult);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-start gap-10 px-4">
            {/* test */}
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
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-medium">Your Resumes</h2>
                    {mockLoggedIn && (
                        <p className="text-sm text-muted-foreground">
                            Logged in as: {mockUsername}
                        </p>
                    )}
                </div>
                {mockLoggedIn ? (
                    <Button variant="outline" onClick={() => setMockLoggedIn(false)}>
                        Switch Accounts
                    </Button>
                ) : (
                    <GuestSaveDialog text="Log In" />
                )}
            </div>

            <div className="grid grid-cols-6 gap-6">
                <CreateResume
                    resumes={resumes}
                    createNewResume={createNewResume}
                    duplicateResume={duplicateResume}
                    deleteResume={deleteResume}
                />
                <ResumeList queryStatus={queryResult} resumes={resumes} />
            </div>
        </div>
    );
}

export default Account;
