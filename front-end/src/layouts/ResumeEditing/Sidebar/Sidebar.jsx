import {DesktopSidebar} from './DesktopSidebar';

const Sidebar = ({
    resume,
    ordering,
    setOrdering,
    setDescription,
    toggleSectionVisibility,
    children,
}) => {
    return (
        <DesktopSidebar
            resume={resume}
            ordering={ordering}
            setOrdering={setOrdering}
            setDescription={setDescription}
            toggleSectionVisibility={toggleSectionVisibility}
        >
            {children}
        </DesktopSidebar>
    );
};

export default Sidebar;
