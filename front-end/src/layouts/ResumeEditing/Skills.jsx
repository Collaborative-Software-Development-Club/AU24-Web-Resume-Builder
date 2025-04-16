import {EditableList} from '@/components/EditableList';

const Skills = ({skills, updateSkills}) => {
    // console.log('skills', skills);

    return (
        <EditableList
            list={skills}
            renderList={(list) => {
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
    );
};

export default Skills;
