import {Button} from './ui/button';
import {cn} from '@/lib/utils';
export function PopupSideButton({onClick, onlyOnHover, children}) {
    return (
        <Button className={cn('absolute -right-5 top-[50%] -translate-y-1/2', onlyOnHover && 'hidden group-hover:block')} onClick={onClick}>
            {children}
        </Button>
    );
}
