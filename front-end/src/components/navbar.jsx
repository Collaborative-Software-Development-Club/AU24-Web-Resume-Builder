'use client';
import {Link, useLocation} from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {cn} from '@/lib/utils';

export function NavBar() {
    const defaultResumeId = '67352f2265e5d74b8503ce90';
    const location = useLocation();

    const getActiveLocation = () => {
        if (location.pathname.includes('/about')) return 'about';
        if (location.pathname.includes('/account')) return 'account';
        return '';
    };

    const activeLocation = getActiveLocation();

    return (
        <div className="flex flex-row justify-end rounded-xl pr-5 pt-6 shadow-sm">
            <NavigationMenu>
                <NavigationMenuList className="gap-1">
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            active={activeLocation == 'about'}
                            asChild
                        >
                            <Link to="/about">About</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            active={activeLocation == 'account'}
                            className={navigationMenuTriggerStyle()}
                            asChild
                        >
                            <Link to="/account">Account</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
