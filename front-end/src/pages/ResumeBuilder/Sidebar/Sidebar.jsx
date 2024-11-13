import {MobileSidebar} from './MobileSidebar';
import {DesktopSidebar} from './DesktopSidebar';

const Sidebar = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
    return (
        <div>
            <MobileSidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility}/>
            <DesktopSidebar resume={resume} ordering={ordering} setOrdering={setOrdering} toggleSectionVisibility={toggleSectionVisibility}/>
        </div>
    );
};

export default Sidebar;
