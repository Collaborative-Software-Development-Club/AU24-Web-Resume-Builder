import {Button} from '@/components/ui/button';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="flex h-full flex-col bg-gradient-to-br from-white via-indigo-50 to-purple-100">
            {/* Hero Section */}
            <div className="flex flex-grow items-center justify-center px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="max-w-2xl text-center pb-20"
                >
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-5xl">
                        Build a Standout Resume in Seconds with AI ✨
                    </h2>
                    <p className="mb-8 text-lg text-gray-600">
                        Let AI craft your resume tailored for your dream job. It's fast, smart, and
                        completely free to start.
                    </p>
                    <div className="flex flex-row items-center justify-center space-x-4 gap-2">
                        <Button
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-lg text-white shadow-md hover:bg-indigo-700"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started for Free
                        </Button>
                        <a href="/guest" className="pt-3 text-lg text-indigo-600 hover:underline">
                            Try Demo →
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
