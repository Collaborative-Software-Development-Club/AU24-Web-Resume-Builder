'use client';
import {Link} from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavBar() {
    const defaultResumeId = '67352f2265e5d74b8503ce90'; // Hardcoded resume ID for demonstration

    return (
        <div className="flex flex-row justify-end rounded-xl pr-5 pt-6 shadow-sm">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to={`/resume/${defaultResumeId}`}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Resume
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/about">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/account">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Account
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
