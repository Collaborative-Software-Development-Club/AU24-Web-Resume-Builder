import { useState } from 'react';
import {EditOnClick} from '../../../components/EditOnClick.jsx';

function ResumeDescription({ initialDescription }) {
  const [description, setDescription] = useState(initialDescription);

  return (
    <div className="p-4">
        <EditOnClick 
        sectionName="resumeDescription"
        displayView={
            <p className="text-lg font-bold bg-transparent">
            {description || "Click here to add your resume description"}
            </p>
        }
        editingView={
            <textarea 
            className="w-full border-2 rounded bg-transparent resize-y min-h-[50px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        }
        empty={!description}
        />
    </div>
  );
}

export default ResumeDescription;