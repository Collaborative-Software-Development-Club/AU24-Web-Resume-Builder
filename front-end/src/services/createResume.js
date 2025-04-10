import {ENDPOINTS} from '@/services/endpoints.js';

export default async function createResume(userId, resumeData = {}) {
    const response = await fetch(ENDPOINTS.resumes({userId: userId}), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    });
    // console.log('response', response);
    const data = await response.json();
    // console.log('data', data.details);
    if (!response.ok) {
        throw new Error(
            `Failed to create resume: ${response.status} ${response.statusText}\n${data.details}`,
        );
    }
    return data;
}
