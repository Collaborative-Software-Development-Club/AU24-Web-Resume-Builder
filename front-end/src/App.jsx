import '@/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from '@/pages/About';
import Account from '@/pages/Account/Account';
import ResumeBuilder from '@/pages/ResumeBuilder';
import GuestResume from '@/pages/GuestResume';
import {NavBar} from '@/components/navbar';

function App() {
    return (
        <Router>
            <div className="flex w-full flex-col items-stretch gap-10">
                <NavBar />
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/resume/:resumeId" element={<ResumeBuilder />} />
                    <Route path="/guest" element={<GuestResume />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
