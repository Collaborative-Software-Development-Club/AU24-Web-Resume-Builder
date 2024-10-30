import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import SidebarItem from './SidebarItem';
import DragAndDropList from './DragAndDropList';

export const Sidebar = ({resume, ordering, setOrdering}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const updatedOrder = ordering.map((item) => {
        let content;
        switch (item.title) {
            case 'education':
                content = <SidebarItem key={item.id} resume={resume} name="Education" elements={['GPA', 'Honors']} />;
                break;
            case 'experience':
                content = <SidebarItem key={item.id} resume={resume} name="Experience" />;
                break;
            case 'projects':
                content = <SidebarItem key={item.id} resume={resume} name="Projects" />;
                break;
            case 'skills':
                content = <SidebarItem key={item.id} resume={resume} name="Skills" />;
                break;
            default:
                content = null;
        }
        return {
            ...item,
            content,
        };
    });

    return (
        <div className="Sidebar flex ">
            {/* Toggle button */}
            <Button className="fixed left-5 top-5 2xl:hidden" onClick={toggleSidebar}>
                <Menu />
            </Button>

            {/* Sidebar */}
            <aside className={`sidebar fixed top-0  ${isOpen ? 'left-0' : 'hidden'} h-full w-58 bg-neutral-500 overflow-visible px-4 text-secondary 2xl:left-0 2xl:block`}>
                <section className="flex justify-between pt-9">
                    <p className="py-3 text-xl">Set Visibility & Ordering</p>
                    <button className="2xl:hidden" onClick={toggleSidebar}>
                        <X size="35" />
                    </button>
                </section>
                <div className="sidebar-content">
                    <ul className="cursor-pointer list-none">
                        <DragAndDropList resume={resume} array={updatedOrder} setArray={setOrdering} />
                    </ul>
                </div>
            </aside>
        </div>
    );
};
