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
import ResumeDescription from './ResumeDescription';

export const DesktopSidebar = ({
    resume,
    ordering,
    setOrdering,
    setDescription,
    toggleSectionVisibility,
    children,
}) => {
    console.log('DesktopSidebar', setDescription);
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Resume Description</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <hr />
                            <ResumeDescription
                                description={resume.description}
                                setDescription={setDescription}
                            />
                        </SidebarGroupContent>
                    </SidebarGroup>
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
