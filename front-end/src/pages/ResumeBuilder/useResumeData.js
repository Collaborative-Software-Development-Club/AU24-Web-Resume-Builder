import {useEffect, useState} from 'react';
import {getResumeData} from '@/services/getResumeData';
import uploadResumeData from '@/services/uploadResumeData';

export default function useResumeData(resumeId, useApi) {
    const [resume, setResume] = useState(null);
    const [ordering, setOrdering] = useState([]);

    //change to updateOrder
    useEffect(() => {
        if (resume) {
            setOrdering(
                resume.orderOfSections.map((item, index) => ({
                    title: item,
                    id: index.toString(),
                })),
            );
        }
    }, [resume]);
    const save = async () => {
        try {
            const newResume = await uploadResumeData(resumeId, resume);
            setResume(newResume);
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        const getData = async () => {
            const resumeData = await getResumeData(resumeId, {useApi: useApi});
            setResume(resumeData);
        };
        getData();
    }, []);

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
        // setResume((prevResume) => {
        //     const index = prevResume.experience.content.findIndex(
        //         (item) => item.id === experienceItem.id,
        //     );
        //     if (index < 0) {
        //         prevResume.experience.content.push(experienceItem);
        //     } else {
        //         prevResume.experience.content[index] = experienceItem;
        //     }
        //     return {
        //         ...prevResume,
        //     };
        // });
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
    // console.log('resume inside hook', resume);
    return {
        resume,
        save,
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
