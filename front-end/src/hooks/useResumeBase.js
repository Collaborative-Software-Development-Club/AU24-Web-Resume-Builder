import {useState} from 'react';

export function useResumeBase(initialResume) {
    const [resume, setResume] = useState(initialResume);

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
                content: {
                    ...prevResume.education.content,
                    ...updatedFields,
                },
            },
        }));
    };

    const updateExperience = (experience) => {
        setResume((prevResume) => ({
            ...prevResume,
            experience: {
                ...prevResume.experience,
                content: [...experience],
            },
        }));
    };

    const updateProjects = (projects) => {
        setResume((prevResume) => ({
            ...prevResume,
            projects: {
                ...prevResume.projects,
                content: [...projects],
            },
        }));
    };

    const updateSkills = (skills) => {
        setResume((prevResume) => ({
            ...prevResume,
            skills: {
                ...prevResume.skills,
                content: skills,
            },
        }));
    };

    const updateOrderOfSections = (newOrder) => {
        setResume((prevResume) => ({
            ...prevResume,
            orderOfSections: newOrder,
        }));
    };

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
        setResume,
        updateName,
        updateContactMethods,
        updateEducation,
        updateExperience,
        updateProjects,
        updateSkills,
        updateOrderOfSections,
        toggleSectionVisibility,
    };
}
