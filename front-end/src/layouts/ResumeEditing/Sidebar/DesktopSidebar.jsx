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
import { EditOnClick } from '../../../components/EditOnClick.jsx';

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
                        <SidebarGroupLabel>Resume Description</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <hr />
                            <div className="flex justify-center p-3">
                                <EditOnClick 
                                    sectionName="resumeDescription"
                                    displayView={
                                    <p className="text-lg text-gray-800 bg-transparent">
                                        {resume.description || "Click here to add your resume description"}

                                    </p>
                                    }
                                    editingView={<textarea 
                                        className="w-full border-2 rounded bg-transparent"
                                        defaultValue={resume.description}
                                        />}
                                    empty={!resume.description}
                                />
                            </div>
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
