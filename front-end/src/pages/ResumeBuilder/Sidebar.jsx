import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import SidebarItem from './SidebarItem';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    //const main = document.querySelector('.main');

    return (
        <div className="Sidebar flex">
            {/* Toggle button */}
            <Button className="fixed left-5 top-5 2xl:hidden" onClick={toggleSidebar}>
                <Menu />
            </Button>

            {/* Sidebar */}
            <aside className={`sidebar fixed top-0 pt-10 ${isOpen ? 'left-0' : 'hidden'} h-full w-56 bg-neutral-500 px-6 text-white 2xl:left-0 2xl:block`}>
                <section className="flex justify-between">
                    <p className="py-3 text-lg">Set Visibility</p>
                    <button className="2xl:hidden" onClick={toggleSidebar}>
                        <X size="35" />
                    </button>
                </section>
                <div className="sidebar-content">
                    <ul className="cursor-pointer list-none">
                        <SidebarItem name="Education" elements={['GPA', 'Honors']} />
                        <SidebarItem name="Experiences" />
                        <SidebarItem name="Projects" />
                        <SidebarItem name="Skills" />
                    </ul>
                </div>
            </aside>
        </div>
    );
};
