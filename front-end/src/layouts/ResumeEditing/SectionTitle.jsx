import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export function SectionTitle({ title, isVisible, onToggleVisibility }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleVisibility}
        className="h-6 w-6 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
      >
        {isVisible ? (
          <Eye className="h-3.5 w-3.5" />
        ) : (
          <EyeOff className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">{isVisible ? "Hide" : "Show"} section</span>
      </Button>
    </div>
  );
}
