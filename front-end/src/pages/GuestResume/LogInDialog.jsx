import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import {AuthenticationForm} from '@/layouts/AuthenticationForm';
import {useState} from 'react';

export function LogInDialog({text = 'Save', className}) {
    const [isDialogOpen, setIsDialogOpen] = useState();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className="">
            <DialogTrigger asChild>
                <Button className={className}>{text}</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-sm !rounded-3xl p-2">
                <AuthenticationForm />
            </DialogContent>
        </Dialog>
    );
}
