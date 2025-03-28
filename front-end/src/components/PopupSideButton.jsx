import {Button} from './ui/button';
import {cn} from '@/lib/utils';

/**
 * A button component that appears as a popup side button.
 *
 * @param {Object} props - The props for the PopupSideButton component.
 * @param {Function} props.onClick - The callback function to handle button click events.
 * @param {boolean} [props.onlyOnHover=false] - If true, the button is only visible when its parent is hovered.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button. This prop is required.
 * @param {string} [props.variant] - The ShadCN variant style of the button.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {Object} props.props - Additional props to pass to the Button component.
 *
 * @throws {Error} Throws an error if the `children` prop is not provided.
 * @returns {JSX.Element} The rendered PopupSideButton component.
 */
export function PopupSideButton({onClick, onlyOnHover, children, variant, className, ...props}) {
    if (children == undefined) {
        throw new Error('children prop not provided to PopupSideButton');
    }
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
