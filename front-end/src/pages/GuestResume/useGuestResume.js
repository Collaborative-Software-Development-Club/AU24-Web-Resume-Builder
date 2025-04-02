import {useEffect} from 'react';
import {DEFAULT_RESUME} from '@/lib/DEFAULT_RESUME';
import {useResumeBase} from '@/hooks/useResumeBase';

const LOCAL_STORAGE_KEY = 'guest-resume';

export function useGuestResume() {
    const initialResume = (() => {
        const savedResume = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedResume ? JSON.parse(savedResume) : DEFAULT_RESUME;
    })();

    const baseHook = useResumeBase(initialResume);
    const {resume} = baseHook;

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    }, [resume]);

    return baseHook;
}
