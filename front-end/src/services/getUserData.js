import {ENDPOINTS} from '@/services/endpoints.js';

export default async function getUserData(userId, useApi) {
    if (useApi == false) {
        return '';
    }
    const response = await fetch(ENDPOINTS.users({userId: userId}));
    const data = await response.json();
    return data;
}
