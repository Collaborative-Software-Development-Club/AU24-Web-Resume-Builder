import React from 'react';

export function SectionTitle({title}) {
    return (
        <div>
            <h1 className="times text-left text-2xl">{title}</h1>
            <hr></hr>
        </div>
    );
}
