import {EditableList} from '@/components/EditableList';
import {SectionTitle} from './SectionTitle';

const Skills = ({skills, updateSkills}) => {
    return (
        <div>
            <SectionTitle title="Skills" />
            <EditableList
                list={skills.map((skill) => skill.skillName)}
                RenderList={({list}) => {
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
        </div>
    );
};

export default Skills;
