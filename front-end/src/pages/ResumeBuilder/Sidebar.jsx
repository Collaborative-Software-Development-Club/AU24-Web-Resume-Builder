import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Menu, X} from 'lucide-react';
import SidebarItem from './SidebarItem';

export const Sidebar = () => {
    const [windowSmall, setWindowSmall] = useState(window.innerWidth <= 1040 ? true : false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleResize() {
            setWindowSmall(window.innerWidth <= 1040 ? true : false);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="Sidebar" style={{display: 'flex'}}>
            {/* Toggle button */}
            <Button className={`fixed left-5 top-5 ${windowSmall ? '' : 'hidden'}`} onClick={toggleSidebar}>
                <Menu />
            </Button>

            {/* Sidebar */}
            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    width: '230px',
                    height: '100%',
                    backgroundColor: '#6b6b6b',
                    color: 'white',
                    position: 'fixed',
                    top: '0',
                    left: `${isOpen || !windowSmall ? 0 : -250}px` /* Initially hidden */,
                    transition: 'left 0.3s ease',
                    padding: '20px',
                }}
            >
                <section className="flex justify-between">
                    <p className="py-3 text-lg">Set Visibility</p>
                    <button className={windowSmall ? '' : 'hidden'} onClick={toggleSidebar}>
                        <X size="35" />
                    </button>
                </section>
                <div className="sidebar-content">
                    <ul style={{cursor: 'pointer', listStyleType: 'none'}}>
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
