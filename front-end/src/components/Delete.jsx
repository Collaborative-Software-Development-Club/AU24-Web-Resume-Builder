import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function Delete({action, onOpenChange}) {
    return (
        <AlertDialog onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this resume?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this resume and
                        remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={action} variant="destructive">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
