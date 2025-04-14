import {Card} from '@/components/ui/card';
import {AuthenticationForm} from '@/layouts/AuthenticationForm';
import {motion} from 'framer-motion';

export function Auth() {
    return (
        <div className="flex h-screen flex-row items-center justify-center">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="max-w-2xl pb-20"
            >
                <Card className="w-full max-w-sm">
                    <AuthenticationForm />
                </Card>
            </motion.div>
        </div>
    );
}
