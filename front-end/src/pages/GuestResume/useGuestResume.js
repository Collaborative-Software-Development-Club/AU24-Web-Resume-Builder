import {useState} from 'react';
import {DEFAULT_RESUME} from '@/services/DEFAULT_RESUME';

export function useGuestResume() {
    const [resume, setResume] = useState(DEFAULT_RESUME);
    const [ordering, setOrdering] = useState(
        DEFAULT_RESUME.orderOfSections.map((item, index) => ({
            title: item,
            id: index.toString(),
        })),
    );

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
