import {DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {TrashIcon} from '@radix-ui/react-icons';

export function EditModal({elements, handleChange, addNew, remove, title, description}) {
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <form className="flex flex-col items-stretch gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        {elements.map((element) => {
                            console.log(element);
                            return (
                                <div className="flex flex-row items-center gap-2">
                                    <Input type="text" value={element.value} key={element.id} onChange={(e) => handleChange(e.target.value, element.id)} />
                                    <Button variant="destructive" size="icon" onClick={() => remove(element.id)}>
                                        <TrashIcon className="h-6 w-6" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <DialogClose asChild>
                    <Button type="submit" onClick={() => {}}>
                        Save
                    </Button>
                </DialogClose>
                <Button onClick={addNew} variant="secondary">
                    Add new
                </Button>
            </form>
        </DialogContent>
    );
}
