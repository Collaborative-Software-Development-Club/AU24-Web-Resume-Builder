import {ENDPOINTS} from '@/services/endpoints.js';
import pdfToText from 'react-pdftotext';

export const parseResume = async (file, authHeader) => {
    try {
        const text = await pdfToText(file);
        const response = await fetch(ENDPOINTS.ai.resume(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader,
            },
            body: JSON.stringify(text),
        });
        if (!response.ok) {
            throw new Error('Failed to enhance text');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error parsing resume:', error);
        throw error;
    }
};
