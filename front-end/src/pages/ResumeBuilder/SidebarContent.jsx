import SidebarItem from './SidebarItem';

export const SidebarContent = () => {
    return(
        <div className="sidebar-content">
        <ul className="cursor-pointer list-none">
            <SidebarItem name="Education" elements={['GPA', 'Honors']} />
            <SidebarItem name="Experiences" />
            <SidebarItem name="Projects" />
            <SidebarItem name="Skills" />
        </ul>
    </div>
    );
};