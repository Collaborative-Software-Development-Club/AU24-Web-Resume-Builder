import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export function GuestSaveDialog({ text = "Save" }) {
    //Log in and Sign up feature to be added
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{text}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save Your Resume!</DialogTitle>
                    <DialogDescription>Log in to save your resume</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 pb-1 pt-3">
                    <Input id="name" placeholder="Username" className="col-span-3" />
                    <Input id="username" placeholder="Password" className="col-span-3" />
                </div>
                <div className="flex flex-col justify-center gap-4">
                    <Button type="submit" className="mx-auto bg-blue-600">
                        Log In
                    </Button>
                    <hr size="10" />
                    <div className="flex flex-row items-center text-gray-500">
                        <p>Don't have an account?</p>
                        <div className="justify-cente mx-auto flex">
                            <Link to="/signup">
                                <Button type="button" className="bg-blue-600">
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}