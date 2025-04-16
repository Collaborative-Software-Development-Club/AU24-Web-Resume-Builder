import '@/App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from '@/pages/About';
import {NavBar} from '@/components/navbar';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import {Dashboard} from './pages/Dashboard';
import {Auth} from './pages/Auth';
import RemoteResume from './pages/RemoteResume';
import GuestResume from './pages/GuestResume';

const queryClient = new QueryClient();

function App() {
    const store = createStore({
        authName: '_auth',
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
    });
    return (
        <AuthProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <InnerApp />
            </QueryClientProvider>
        </AuthProvider>
    );
}

function InnerApp() {
    return (
        <Router>
            <div className="h-full min-h-screen">
                <NavBar />
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resume" element={<GuestResume />} />
                    <Route element={<AuthOutlet fallbackPath="/auth" />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/resume/:resumeId" element={<RemoteResume />} />
                    </Route>
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
