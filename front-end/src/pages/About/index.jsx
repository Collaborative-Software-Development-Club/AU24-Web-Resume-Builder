import {buttonVariants} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {motion} from 'framer-motion';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import {Link} from 'react-router-dom';

export default function About() {
    const isAuthenticated = useIsAuthenticated();
    return (
        <div className="flex h-screen flex-col">
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
                        {isAuthenticated ? (
                            <Link to="/dashboard" className={buttonVariants()}>
                                Go to My Resumes
                            </Link>
                        ) : (
                            <>
                                <Link
                                    className={cn(
                                        buttonVariants({variant: 'default'}),
                                        'rounded-xl bg-indigo-600 px-6 py-3 text-lg text-white shadow-md hover:bg-indigo-700',
                                    )}
                                    to="/resume"
                                >
                                    Create a Resume
                                </Link>
                                <Link
                                    to="/auth"
                                    className={cn(
                                        buttonVariants({variant: 'link'}),
                                        'pt-3 text-lg text-indigo-600 hover:underline',
                                    )}
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
