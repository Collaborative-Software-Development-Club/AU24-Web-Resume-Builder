'use client';
import {Link, useLocation} from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import {LogInDialog} from './LogInDialog';

export function NavBar() {
    const isAuthenticated = useIsAuthenticated();
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
                        {isAuthenticated ? (
                            <NavigationMenuLink
                                active={activeLocation == 'account'}
                                className={navigationMenuTriggerStyle()}
                                asChild
                            >
                                <Link to="/account">Account</Link>
                            </NavigationMenuLink>
                        ) : (
                            <NavigationMenuLink
                                active={activeLocation == 'login'}
                                className={navigationMenuTriggerStyle()}
                                asChild
                            >
                                <LogInDialog text="Log In" className="bg-none border-none text-black shadow-none"/>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
