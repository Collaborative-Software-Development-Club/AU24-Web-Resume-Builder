import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from 'lucide-react';

const AITextImprovementButton = ({ placeholder }) => {
  return (
    <div className="relative inline-block w-full">
      {/* Shadcn input component */}
      <Input
        type="text"
        placeholder={placeholder}
        className=""
      />

      {/* Shadcn button component with Tailwind classes */}
      <Button
        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
        variant="default"
        size="icon"
      >
        {/* Lucide React icon */}
        <Wand2 className="h-4 w-4"/>
      </Button>
    </div>
  );
};

export default AITextImprovementButton;
