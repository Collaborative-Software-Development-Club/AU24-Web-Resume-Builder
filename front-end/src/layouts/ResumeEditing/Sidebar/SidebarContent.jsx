import {useState} from 'react';
import SidebarItem from './SidebarItem';
import DragAndDropList from '../DragAndDropList';

export const SidebarContent = ({resume, ordering, setOrdering, toggleSectionVisibility}) => {
    const updatedOrder = ordering
        .map((sectionId) => {
            let content;

            const sectionName = sectionId.toLowerCase();

            const handleVisibilityChange = (isVisible) => {
                toggleSectionVisibility(sectionName, isVisible);
            };

            switch (sectionId) {
                case 'EDUCATION':
                    content = (
                        <SidebarItem
                            key={sectionId}
                            section={resume.education}
                            name="Education"
                            handleVisibilityChange={handleVisibilityChange}
                            visible={resume.education.visible}
                        />
                    );
                    break;
                case 'EXPERIENCE':
                    content = (
                        <SidebarItem
                            key={sectionId}
                            section={resume.experience}
                            name="Experience"
                            handleVisibilityChange={handleVisibilityChange}
                            visible={resume.experience.visible}
                        />
                    );
                    break;
                case 'PROJECTS':
                    content = (
                        <SidebarItem
                            key={sectionId}
                            section={resume.projects}
                            name="Projects"
                            handleVisibilityChange={handleVisibilityChange}
                            visible={resume.projects.visible}
                        />
                    );
                    break;
                case 'SKILLS':
                    content = (
                        <SidebarItem
                            key={sectionId}
                            section={resume.skills}
                            name="Skills"
                            handleVisibilityChange={handleVisibilityChange}
                            visible={resume.skills.visible}
                        />
                    );
                    break;
                default:
                    // throw new Error('Unexpected value for sectionId in SidebarContent');
                    // TODO order of sections includes sections not handled in the front-end, like PROFESSIONAL_SUMMARY and VOLUNTEER_EXPERIENCE
                    content = null;
            }
            return {
                orderId: sectionId,
                sectionId,
                content,
            };
        })
        .filter((item) => item.content != null);

    // Passed in setter for array
    const setResumeOrdering = (newArray) => {
        // console.log('setting resume order on SidebarContent');
        // console.log('newArray in SidebarContent > setResumeOrdering ');
        setOrdering(newArray.map((item) => item.sectionId));
    };
    // console.log('updatedOrder in sidebar content', updatedOrder);
    return (
        <div className="flex w-full flex-col p-4">
            <p className="text-lg font-bold">Set Visibility & Ordering</p>
            <div className="sidebar-content">
                <ul className="cursor-pointer list-none">
                    <DragAndDropList items={updatedOrder} setItems={setResumeOrdering} />
                </ul>
            </div>
        </div>
    );
};
