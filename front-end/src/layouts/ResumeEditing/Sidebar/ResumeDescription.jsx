import {EditOnClick} from '../../../components/EditOnClick.jsx';
import {AutosizeTextarea} from '@/components/ui/autosize-textarea.jsx';

function ResumeDescription({description, setDescription}) {
    // console.log('ResumeDescription', description, setDescription);
    return (
        <div className="p-4">
            <EditOnClick
                empty={!description}
                sectionName="Description"
                displayView={<p className="text-lg font-bold">{description}</p>}
                editingView={
                    // <textarea
                    // className="w-full border-2 rounded bg-transparent resize-y min-h-[50px]"
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                    // />
                    <AutosizeTextarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                }
            />
        </div>
    );
}

export default ResumeDescription;
