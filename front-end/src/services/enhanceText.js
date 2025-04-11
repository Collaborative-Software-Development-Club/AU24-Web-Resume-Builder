import {ENDPOINTS} from '@/services/endpoints.js';

export const enhanceText = async (text) => {
    try {
        const encodedText = encodeURIComponent(text);
        const response = await fetch(ENDPOINTS.ai.description({text: encodedText}));

        if (!response.ok) {
            throw new Error('Failed to enhance text');
        }

        const data = await response.json();
        return data.generation;
    } catch (error) {
        console.error('Error enhancing text:', error);
        throw error;
    }
};
