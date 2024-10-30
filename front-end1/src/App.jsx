import '@/App.css';
import ResumeBuilder from '@/pages/ResumeBuilder';
import {NavBar} from '@/components/navbar';
function App() {
    return (
        <div className="flex w-full flex-col items-stretch gap-10 p-10">
            <NavBar />
            <ResumeBuilder />
        </div>
    );
}

export default App;
