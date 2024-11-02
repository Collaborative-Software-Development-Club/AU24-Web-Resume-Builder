import {SidebarContent} from './SidebarContent';

export const DesktopSidebar = () => {
    return(
        <aside className={`fixed top-0 pt-10 h-full w-56 bg-white px-6 hidden 2xl:left-0 2xl:block sm:xl`}>
            <p className = "font-semibold text-lg">Resume Settings</p>
            <hr/>
            <SidebarContent />
        </aside>
    );
};