import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import {AUTH_QUERIES} from '../../services/authQueries';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

export function SignUpForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const signIn = useSignIn();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        //setIsSubmitting(true);

        try {
            await AUTH_QUERIES.register(formData);

            //LogIn
            const data = await AUTH_QUERIES.login(formData);
            if (
                signIn({
                    auth: {
                        token: data.token,
                        type: 'Bearer',
                        expiresIn: 3600,
                    },
                    userState: {
                        username: data.user.username,
                        uid: data.user.id,
                    },
                })
            ) {
                alert('Signup successful! Redirecting to account page...');
                navigate('/dashboard');
            }
        } catch (err) {
            setError(
                err.message
                    ? 'Username already exists. Please choose a different username.'
                    : 'Signup failed. Please try again.',
            );
        }
    };
    return (
        <>
            <h1 className="text-2xl font-semibold">Create an Account</h1>
            <p className="text-sm text-muted-foreground">
                Create an account to create multiple resumes and access AI resume improvements.
            </p>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>
                )}
                <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                placeholder="Enter your password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600 hover:scale-100"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Enter your password again"
                            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <Button type="submit">Sign Up</Button>
                </div>
            </form>
        </>
    );
}
