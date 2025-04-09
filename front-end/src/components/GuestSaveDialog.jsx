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
import {Link} from 'react-router-dom';

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
                <div className="flex flex-col justify-stretch gap-4">
                    <Button type="submit" className="">
                        Log In
                    </Button>
                    <hr size="10" />
                    <DialogFooter className="row flex items-center !justify-center text-sm text-muted-foreground">
                        Don't have an account?
                        <Link className={buttonVariants({variant: 'link'})}>Sign In</Link>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}