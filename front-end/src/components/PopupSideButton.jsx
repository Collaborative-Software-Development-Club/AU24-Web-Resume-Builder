import {Button} from './ui/button';
import {cn} from '@/lib/utils';
export function PopupSideButton({onClick, onlyOnHover, children, variant, className, ...props}) {
    return (
        <Button
            className={cn(
                'absolute -right-4 -top-6',
                onlyOnHover && 'hidden group-hover:block',
                className,
            )}
            onClick={onClick}
            variant={variant}
            {...props}
        >
            {children}
        </Button>
    );
}
