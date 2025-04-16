import { useState } from 'react';
import Experience from './Experience';
import {SectionOfDraggableItems} from './SectionOfDraggableItems';
import {SectionTitle} from './SectionTitle';

export function Experiences({updateExperience, experiences}) {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    return (
        <>
            <SectionTitle 
                title="Experience" 
                isVisible={isVisible} 
                onToggleVisibility={toggleVisibility}
            />
            {isVisible && (
            <SectionOfDraggableItems
                renderItem={(experienceData, update) => (
                    <Experience experience={experienceData} updateItems={update} />
                )}
                itemData={experiences}
                createNewItem={createNewItem}
                setItemData={updateExperience}
            />
            )}
        </>
    );
}

function createNewItem() {
    const base = {
        startDate: {month: 0, year: undefined},
        endDate: {month: 0, year: undefined},
        location: '',
    };
    return {...base, position: '', company: '', description: ''};
}
