import '@/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from '@/pages/About';
import Account from '@/pages/Account';
import ResumeBuilder from '@/pages/ResumeBuilder';
import GuestResume from '@/pages/GuestResume';
import {NavBar} from '@/components/navbar';
import SignUp from '@/SignUp';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="flex h-screen w-full flex-col items-stretch">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/resume/:resumeId" element={<ResumeBuilder />} />
                        <Route path="/guest" element={<GuestResume />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
