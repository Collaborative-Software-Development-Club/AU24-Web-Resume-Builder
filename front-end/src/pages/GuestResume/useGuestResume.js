import {useState, useEffect} from 'react';
import {DEFAULT_RESUME} from '@/lib/DEFAULT_RESUME';

const LOCAL_STORAGE_KEY = 'guest-resume';

export function useGuestResume() {
    const [resume, setResume] = useState(() => {
        const savedResume = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedResume ? JSON.parse(savedResume) : DEFAULT_RESUME;
    });
    const [ordering, setOrdering] = useState(
        DEFAULT_RESUME.orderOfSections.map((item, index) => ({
            title: item,
            id: index.toString(),
        })),
    );

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
    }, [resume]);

    const updateName = (name) => {
        setResume((prevResume) => ({
            ...prevResume,
            name: name,
        }));
    };

    const updateContactMethods = (contactMethods) => {
        setResume((prevResume) => ({
            ...prevResume,
            contactMethods: contactMethods,
        }));
    };

    const updateEducation = (updatedFields) => {
        setResume((prevResume) => ({
            ...prevResume,
            education: {
                ...prevResume.education,
                ...updatedFields,
            },
        }));
    };

    const updateExperience = (experience) => {
        setResume((prevResume) => ({
            ...prevResume,
            experience: {
                ...prevResume.experience,
                items: [...experience],
            },
        }));
    };

    const updateProjects = (projects) => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: {
                ...prevResume.projects,
                items: [...projects],
            },
        }));
    };

    const updateSkills = (skills) => {
        setResume((prevResume) => ({
            ...prevResume,
            skills: {
                ...prevResume.skills,
                items: skills,
            },
        }));
    };

    // function to toggle visibility
    const toggleSectionVisibility = (sectionName, isVisible) => {
        setResume((prevResume) => ({
            ...prevResume,
            [sectionName]: {
                ...prevResume[sectionName],
                visible: isVisible,
            },
        }));
    };
    return {
        resume,
        ordering,
        setOrdering,
        toggleSectionVisibility,
        updateName,
        updateContactMethods,
        updateEducation,
        updateExperience,
        updateProjects,
        updateSkills,
    };
}
