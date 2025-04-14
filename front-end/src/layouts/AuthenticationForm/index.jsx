import {useState} from 'react';
import {LogInForm} from './LogInForm';
import {SignUpForm} from './SignUpForm';
import {Button} from '@/components/ui/button';

export function AuthenticationForm() {
    const [logIn, setLogIn] = useState(true);
    return (
        <div className="flex flex-col gap-4 p-6">
            {logIn ? <LogInForm /> : <SignUpForm />}
            <div className="text-sm">
                {logIn ? 'Already have an account? ' : "Don't have an account? "}
                <Button variant="link" className="text-sm" onClick={() => setLogIn(!logIn)}>
                    {logIn ? 'Sign Up' : 'Log In'}
                </Button>
            </div>
        </div>
    );
}
