import {ENDPOINTS} from '@/services/endpoints.js';

export async function getUserResumes(userId) {
    const response = await fetch(ENDPOINTS.resumes({userId: userId}));
    console.log(response);
    if (response.status == 204) {
        return [];
    }
    const data = await response.json();
    console.log(data);
    return data;
}
