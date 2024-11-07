import {SidebarContent} from './Sidebar/SidebarContent';

export const DesktopSidebar = () => {
    return (
        <aside className={`sm:xl fixed top-0 hidden h-full w-56 bg-white px-6 pt-10 2xl:left-0 2xl:block`}>
            <p className="text-lg font-semibold">Resume Settings</p>
            <hr />
            <SidebarContent />
        </aside>
    );
};
