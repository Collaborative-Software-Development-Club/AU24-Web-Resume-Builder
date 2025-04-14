import {useUserResumes} from '../../hooks/useUserResumes';
import {Button} from '@/components/ui/button';
import {CreateResume} from './CreateResume';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import {useNavigate} from 'react-router-dom';
import {ResumeList} from './ResumeList';

export function Dashboard() {
    const logOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const {
        resumes,
        deleteResume,
        create: createNewResume,
        duplicate: duplicateResume,
        queryResult,
    } = useUserResumes(auth.uid);

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-start gap-10 px-4 pt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-medium">{`${auth.username}'s Resumes`}</h2>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => {
                        logOut();
                        navigate('/auth');
                    }}
                >
                    Log Out
                </Button>
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
