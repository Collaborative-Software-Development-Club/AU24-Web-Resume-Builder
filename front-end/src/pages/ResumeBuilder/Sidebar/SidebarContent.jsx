import {useState} from 'react';
import SidebarItem from './SidebarItem';
import DragAndDropList from '../DragAndDropList';

export const SidebarContent = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const updatedOrder = ordering?.map((item) => {
        let content;

        const sectionName = item.title.toLowerCase();

        const handleVisibilityChange = (isVisible) => {
            toggleSectionVisibility(sectionName, isVisible);
        };

        switch (item.title) {
            case 'EDUCATION':
                content = <SidebarItem key={item.id} section={resume.education} name="Education" elements={['GPA', 'Honors']} handleVisibilityChange={handleVisibilityChange} />;
                break;
            case 'EXPERIENCE':
                content = <SidebarItem key={item.id} section={resume.experience} name="Experience" handleVisibilityChange={handleVisibilityChange} />;
                break;
            case 'PROJECTS':
                content = <SidebarItem key={item.id} section={resume.projects} name="Projects" handleVisibilityChange={handleVisibilityChange} />;
                break;
            case 'SKILLS':
                content = <SidebarItem key={item.id} section={resume.skills} name="Skills" handleVisibilityChange={handleVisibilityChange} />;
                break;
            default:
                content = null;
        }
        return {
            ...item,
            content,
        };
    });

    // Passed in setter for array
    const setResumeOrdering = (newArray) => {
        setOrdering(newArray);
        resume.orderOfSections = newArray.map((item) => {
            return item.title;
        });
    };

    return (
        <div className="Sidebar flex flex-col w-full">
            <p className="2xl:pt-5 text-lg">Set Visibility & Ordering</p>
            <div className="sidebar-content">
                <ul className="cursor-pointer list-none">
                    <DragAndDropList resume={resume} array={updatedOrder} setArray={setResumeOrdering} />
                </ul>
            </div>
        </div>
    );
};
