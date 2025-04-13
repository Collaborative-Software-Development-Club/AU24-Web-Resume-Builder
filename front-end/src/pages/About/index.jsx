import {Button, buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import UploadButton from '@/components/ui/uploadbutton'; // Adjust the path if needed


export default function About() {
    return (
        <div className="flex h-full flex-col bg-gradient-to-br from-white via-indigo-50 to-purple-100">
            {/* Hero Section */}
            <div className="flex flex-grow items-center justify-center px-4">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="max-w-2xl pb-20 text-center"
                >
                    <h2 className="mb-6 text-3xl font-extrabold text-gray-900 md:text-5xl">
                        Build a Standout Resume in Seconds with AI ✨
                    </h2>
                    <p className="mb-8 text-lg text-gray-600">
                        Let AI craft your resume tailored for your dream job. It's fast, smart, and
                        completely free to start.
                    </p>
                    <div className="flex flex-row items-center justify-center gap-2 space-x-4">
                        <a
                            className={cn(
                                buttonVariants({variant: 'default'}),
                                'rounded-xl bg-indigo-600 px-6 py-3 text-lg text-white shadow-md hover:bg-indigo-700',
                            )}
                            href="/guest"
                        >
                            Get Started for Free
                        </a>
                        <a
                            href="/signup"
                            className={cn(
                                buttonVariants({variant: 'link'}),
                                'pt-3 text-lg text-indigo-600 hover:underline',
                            )}
                        >
                            Log in
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
