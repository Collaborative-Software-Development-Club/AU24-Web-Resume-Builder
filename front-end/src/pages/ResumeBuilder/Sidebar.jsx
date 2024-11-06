import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import SidebarItem from './SidebarItem';
import DragAndDropList from './DragAndDropList';

export const Sidebar = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
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
                content = <SidebarItem key={item.id} section={resume.skills}  name="Skills" handleVisibilityChange={handleVisibilityChange} />;
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
        <div className="Sidebar flex">
            {/* Toggle button */}
            <Button className="fixed left-5 top-5 2xl:hidden" onClick={toggleSidebar}>
                <Menu />
            </Button>

            {/* Sidebar */}
            <aside className={`sidebar fixed top-0 ${isOpen ? 'left-0' : 'hidden'} w-58 h-full overflow-visible bg-neutral-500 px-4 text-secondary 2xl:left-0 2xl:block`}>
                <section className="flex justify-between pt-9">
                    <p className="py-3 text-xl">Set Visibility & Ordering</p>
                    <button className="2xl:hidden" onClick={toggleSidebar}>
                        <X size="35" />
                    </button>
                </section>
                <div className="sidebar-content">
                    <ul className="cursor-pointer list-none">
                        <DragAndDropList resume={resume} array={updatedOrder} setArray={setResumeOrdering} />
                    </ul>
                </div>
            </aside>
        </div>
    );
};

