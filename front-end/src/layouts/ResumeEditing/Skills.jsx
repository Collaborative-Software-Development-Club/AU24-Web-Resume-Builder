import {EditableList} from '@/components/EditableList';
import {SectionTitle} from './SectionTitle';

const Skills = ({skills, updateSkills}) => {
    const visibleSkills = skills.filter((skill) => skill.visible);
    const choice1 = `<div>
                            <p className="times list-disc" key="skills">
                                • {list.join(', ')}
                            </p>
                        </div>`;

    const choice2 = `<div className="grid grid-cols-4 gap-2">
                            {list.map((element) => (
                            <p className="times" key={element}>
                                • {element}
                            </p>
                        ))}
                        </div>`;

    return (
        <div>
            <SectionTitle title="Skills" />
            <EditableList
                list={visibleSkills.map((skill) => skill.skillName)}
                RenderList={({list}) => {
                    return (
                        <div>
                            <p className="times list-disc" style={{overflow: 'hidden'}} key="skills">
                                • {list.join(', ')}
                            </p>
                        </div>
                    );
                }}
                title="Skills"
                description="Edit Skill List"
                updateList={updateSkills}
            />
        </div>
    );
};

export default Skills;
