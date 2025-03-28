import {SidebarContent} from './SidebarContent';

export const DesktopSidebar = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
    return (
        <aside className={`sm:xl fixed top-5 hidden h-full w-[270px] bg-white px-6 py-10 2xl:left-0 2xl:block`}>
            <p className="text-lg font-semibold text-center">Resume Settings</p>
            <hr />
            <SidebarContent resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility}/>
        </aside>
    );
};
