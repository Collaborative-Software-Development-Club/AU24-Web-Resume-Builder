import {EditableList} from '@/components/EditableList';
import jsonData from '@/../../data/resume.json';
import {SectionTitle} from './SectionTitle';

const Skills = () => {
    const skills = jsonData.skills.items;
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
                list={skills}
                RenderList={({list}) => {
                    console.log(list);
                    return (
                        <div>
                            <p className="times list-disc" key="skills">
                                • {list.join(', ')}
                            </p>
                        </div>
                    );
                }}
                title="Skills"
                description="Edit Skill List"
            />
        </div>
    );
};

export default Skills;
