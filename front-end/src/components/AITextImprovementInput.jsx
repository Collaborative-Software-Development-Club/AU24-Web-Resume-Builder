import { enhanceText } from '@/services/aiService';
import {AutosizeTextarea} from '@/components/ui/autosize-textarea';
import {Button} from '@/components/ui/button';
import {Wand2} from 'lucide-react';

export function AITextImprovementInput({placeholder, onChange, name, value}) {
    return (
        <div className="relative">
            <AutosizeTextarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="times"
            />
            <Button
                className="absolute bottom-2 right-2 gap-2 rounded-full p-4 text-lg"
                variant="default"
            >
                <Wand2 className="" />
                AI
            </Button>
        </div>
    );
}
