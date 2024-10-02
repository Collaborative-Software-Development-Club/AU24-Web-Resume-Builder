import {useState} from 'react';
import {Input} from '@/components/ui/input';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="Sidebar" style={{display: 'flex', overflow: 'hidden'}}>
            {/* Toggle button */}
            <button
                className="toggle-btn"
                onClick={toggleSidebar}
                style={{position: 'absolute', top: '20px', left: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}
            >
                {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <button
                        className="toggle-btn"
                        onClick={toggleSidebar}
                        style={{position: 'fixed', top: '20px', left: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}
                    >
                        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
                    </button>
                    <h2>Sidebar Menu</h2>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Services</li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};
