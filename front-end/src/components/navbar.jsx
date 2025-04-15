'use client';
import {Link, useLocation} from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {buttonVariants} from './ui/button';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import {cn} from '@/lib/utils';

export function NavBar() {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    const getActiveLocation = () => {
        if (location.pathname.includes('/about')) return 'about';
        if (location.pathname.includes('/dashboard')) return 'dashboard';
        return '';
    };

    const activeLocation = getActiveLocation();

    return (
        <div className="flex flex-row items-center justify-end bg-white/50 p-2">
            <NavigationMenu className="">
                <NavigationMenuList className="gap-1">
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={buttonVariants({variant: 'link'})}
                            active={activeLocation == 'about'}
                            asChild
                        >
                            <Link to="/about">About</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            active={activeLocation == 'dashboard'}
                            className={cn(
                                buttonVariants({variant: isAuthenticated ? 'link' : 'outline'}),
                            )}
                            asChild
                        >
                            <Link to="/dashboard">{isAuthenticated ? 'My Resumes' : 'Log In'}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
