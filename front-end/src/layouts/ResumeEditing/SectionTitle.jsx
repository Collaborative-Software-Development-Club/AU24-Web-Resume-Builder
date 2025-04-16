import React from 'react';
import {Button} from '@/components/ui/button';
import {Eye, EyeOff} from 'lucide-react';

export function SectionTitle({title, hide}) {
    return (
        <div>
            <div className="times flex items-center gap-2">
                <h2 className="times text-left text-2xl">{title}</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={hide}
                    className="h-6 w-6 p-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
                >
                    <EyeOff className="h-3.5 w-3.5" />
                    <span className="sr-only">Hide section</span>
                </Button>
            </div>
            <hr></hr>
        </div>
    );
}
