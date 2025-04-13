import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, buttonVariants} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import {motion} from 'framer-motion';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import {AUTH_QUERIES} from '../../services/authQueries';

export default function Signup() {
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
            console.log('Signup data:', formData);
            await AUTH_QUERIES.register(formData);
            alert('Signup successful! Redirecting to account page...');

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
                navigate('/account/' + data.user.id);
            }
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } 
    };

    return (
        <div className="flex h-full flex-row items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-100 pb-20">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="max-w-2xl pb-20"
            >
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create an Account</CardTitle>
                        <CardDescription>
                            Create an account to create multiple resumes and access AI resume
                            improvements.
                        </CardDescription>
                        {error && (
                            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </Label>
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
                    </CardContent>
                    <CardFooter className="text-sm">
                        Already have an account?{' '}
                        <Link to="/account" className={buttonVariants({variant: 'link'})}>
                            Log in
                        </Link>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
