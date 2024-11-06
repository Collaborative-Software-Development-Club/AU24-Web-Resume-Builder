import SidebarItem from './SidebarItem';

export const SidebarContent = () => {
    return(
        <div className="sidebar-content">
        <p className="pt-3 text-lg">Set Visibility</p>
        <ul className="cursor-pointer list-none ml-7">
            <SidebarItem name="Education" elements={['GPA', 'Honors']} />
            <SidebarItem name="Experiences" />
            <SidebarItem name="Projects" />
            <SidebarItem name="Skills" />
        </ul>
    </div>
    );
};