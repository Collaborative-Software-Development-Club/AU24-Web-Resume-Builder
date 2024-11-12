import '@/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '@/pages/About';
import Account from '@/pages/Account';
import ResumeBuilder from '@/pages/ResumeBuilder';
import { NavBar } from '@/components/Navbar';

function App() {
    return (
        <Router>
            <div className="flex w-full flex-col items-stretch gap-10">
                <NavBar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/resume/:userId" element={<ResumeBuilder />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;