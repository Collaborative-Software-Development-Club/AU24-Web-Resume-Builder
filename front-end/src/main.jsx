import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '@/App.jsx';
import '@/index.css';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>,
);
