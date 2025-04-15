import {ENDPOINTS} from '@/services/endpoints.js';

export const enhanceText = async (text, authHeader) => {
    console.log('enhancing text', authHeader);
    try {
        const encodedText = encodeURIComponent(text);
        const response = await fetch(ENDPOINTS.ai.description({text: encodedText}), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader,
            },
        });

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
