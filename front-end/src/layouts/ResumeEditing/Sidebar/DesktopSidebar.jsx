import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {SidebarContent as OurSidebarContent} from './SidebarContent';

export const DesktopSidebar = ({
    resume,
    ordering,
    setOrdering,
    toggleSectionVisibility,
    children,
}) => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Resume Settings</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <hr />
                            <OurSidebarContent
                                resume={resume}
                                ordering={ordering}
                                setOrdering={setOrdering}
                                toggleSectionVisibility={toggleSectionVisibility}
                            />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    );
};
