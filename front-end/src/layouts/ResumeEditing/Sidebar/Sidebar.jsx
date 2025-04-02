import {DesktopSidebar} from './DesktopSidebar';

const Sidebar = ({resume, ordering, setOrdering, toggleSectionVisibility, children}) => {
    return (
        <DesktopSidebar
            resume={resume}
            ordering={ordering}
            setOrdering={setOrdering}
            toggleSectionVisibility={toggleSectionVisibility}
        >
            {children}
        </DesktopSidebar>
    );
};

export default Sidebar;
