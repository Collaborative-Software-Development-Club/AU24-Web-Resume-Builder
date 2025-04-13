import {Button, buttonVariants} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from './ui/label';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import {AUTH_QUERIES} from '@/services/authQueries';

export function LogInDialog({text = 'Save', className}) {
    const [isDialogOpen, setIsDialogOpen] = useState();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
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

        try {
            //LogIn
            const data = await AUTH_QUERIES.login(formData);
            console.log(data);
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
                navigate('/account');
            }
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            //setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className={className}>{text}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log In</DialogTitle>
                    <DialogDescription>Log in to save your resume!</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 pb-1 pt-3">
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
                            <Button type="submit">Log In</Button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col justify-stretch gap-4">
                    <hr size="10" />
                    <DialogFooter className="row flex items-center !justify-center text-sm text-muted-foreground">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className={buttonVariants({variant: 'link'})}
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
