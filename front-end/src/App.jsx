import '@/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from '@/pages/About';
import Account from '@/pages/Account';
import ResumeBuilder from '@/pages/ResumeBuilder';
import GuestResume from '@/pages/GuestResume';
import {NavBar} from '@/components/navbar';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import SignUp from '@/SignUp';

function App() {
    const store = createStore({
        authName: '_auth',
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
    });
    return (
        <AuthProvider store={store}>
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
        </AuthProvider>
    );
}

export default App;
