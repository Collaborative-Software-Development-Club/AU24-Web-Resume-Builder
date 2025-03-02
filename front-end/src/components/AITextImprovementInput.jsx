import React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Wand2} from 'lucide-react';

export function AITextImprovementInput({placeholder, onChange, name, value}) {
    return (
        <div className="relative inline-block w-full">
            {/* Shadcn input component */}
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
            />

            {/* Shadcn button component with Tailwind classes */}
            <Button
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2"
                variant="default"
                size="icon"
            >
                {/* Lucide React icon */}
                <Wand2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
