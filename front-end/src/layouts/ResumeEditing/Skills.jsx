import { useState } from 'react';
import {EditableList} from '@/components/EditableList';
import {SectionTitle} from './SectionTitle';

const Skills = ({skills, updateSkills}) => {
    // console.log('skills', skills);

    const [isVisible, setIsVisible] = useState(true);
    
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <div>
            <SectionTitle 
                title="Skills"
                isVisible={isVisible} 
                onToggleVisibility={toggleVisibility} 
            />
            {isVisible && (
            <EditableList
                list={skills}
                renderList={(list) => {
                    return (
                        <div>
                            <p
                                className="times list-disc"
                                style={{overflow: 'hidden'}}
                                key="skills"
                            >
                                • {list.join(', ')}
                            </p>
                        </div>
                    );
                }}
                title="Skills"
                description="Edit Skill List"
                updateList={updateSkills}
            />
            )}
        </div>
    );
};

export default Skills;
