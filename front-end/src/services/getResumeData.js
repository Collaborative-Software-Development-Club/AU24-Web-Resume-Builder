import jsonData from '@/../../data/resume.json';
import {ENDPOINTS} from '@/services/endpoints.js';

export async function getResumeData(resumeId, {useApi}) {
    if (useApi === false) {
        return jsonData;
    }
    const response = await fetch(ENDPOINTS.resumes({resumeId: resumeId}));
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            `Failed to get resume: ${response.status} ${response.statusText}\n${data.details}`,
        );
    }
    return data;
}
