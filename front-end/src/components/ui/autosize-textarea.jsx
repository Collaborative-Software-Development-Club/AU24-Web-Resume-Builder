'use client';
import * as React from 'react';
import {cn} from '@/lib/utils';
import {useImperativeHandle} from 'react';

export const useAutosizeTextArea = ({
    textAreaRef,
    triggerAutoSize,
    maxHeight = Number.MAX_SAFE_INTEGER,
    minHeight = 0,
}) => {
    const [init, setInit] = React.useState(true);

    React.useEffect(() => {
        const offsetBorder = 6;
        const textAreaElement = textAreaRef.current;

        if (textAreaElement) {
            if (init) {
                textAreaElement.style.minHeight = `${minHeight + offsetBorder}px`;
                if (maxHeight > minHeight) {
                    textAreaElement.style.maxHeight = `${maxHeight}px`;
                }
                setInit(false);
            }
            textAreaElement.style.height = `${minHeight + offsetBorder}px`;
            const scrollHeight = textAreaElement.scrollHeight;

            if (scrollHeight > maxHeight) {
                textAreaElement.style.height = `${maxHeight}px`;
            } else {
                textAreaElement.style.height = `${scrollHeight + offsetBorder}px`;
            }
        }
    }, [textAreaRef.current, triggerAutoSize]);
};

export const AutosizeTextarea = React.forwardRef(
    (
        {maxHeight = Number.MAX_SAFE_INTEGER, minHeight = 52, className, onChange, value, ...props},
        ref,
    ) => {
        const textAreaRef = React.useRef(null);
        const [triggerAutoSize, setTriggerAutoSize] = React.useState('');

        useAutosizeTextArea({textAreaRef, triggerAutoSize, maxHeight, minHeight});

        useImperativeHandle(ref, () => ({
            textArea: textAreaRef.current,
            focus: () => textAreaRef?.current?.focus(),
            maxHeight,
            minHeight,
        }));

        React.useEffect(() => {
            setTriggerAutoSize(value);
        }, [props?.defaultValue, value]);

        return (
            <textarea
                {...props}
                value={value}
                ref={textAreaRef}
                className={cn(
                    'flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                onChange={(e) => {
                    setTriggerAutoSize(e.target.value);
                    onChange?.(e);
                }}
            />
        );
    },
);

AutosizeTextarea.displayName = 'AutosizeTextarea';
