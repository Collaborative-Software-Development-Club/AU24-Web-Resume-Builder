'use client';
import { Link, useLocation } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export function NavBar() {
    const defaultResumeId = '67352f2265e5d74b8503ce90';
    const location = useLocation();

    const getActiveLocation = () => {
        if (location.pathname.includes('/resume')) return 'resume';
        if (location.pathname.includes('/about')) return 'about';
        if (location.pathname.includes('/account')) return 'account';
        return '';
    }

    const activeLocation = getActiveLocation();

    return (
        <div className="flex flex-row justify-end rounded-xl pr-5 pt-6 shadow-sm">
            <NavigationMenu>
                <NavigationMenuList className="gap-1">
                    <NavigationMenuItem>
                        <Link to={`/resume/${defaultResumeId}`}>
                            <NavigationMenuLink 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "transition-colors hover:bg-accent/70", // Lighter hover state
                                    activeLocation === 'resume' 
                                        ? "border border-primary bg-accent/50" // Active state
                                        : "bg-transparent" // Default transparent
                                )}
                            >
                                Resume
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/about">
                            <NavigationMenuLink 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "transition-colors hover:bg-accent/70",
                                    activeLocation === 'about' 
                                        ? "border border-primary bg-accent/50" 
                                        : "bg-transparent"
                                )}
                            >
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/account">
                            <NavigationMenuLink 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "transition-colors hover:bg-accent/70",
                                    activeLocation === 'account' 
                                        ? "border border-primary bg-accent/50" 
                                        : "bg-transparent"
                                )}
                            >
                                Account
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
