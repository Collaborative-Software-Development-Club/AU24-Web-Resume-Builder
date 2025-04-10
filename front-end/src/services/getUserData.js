import {ENDPOINTS} from '@/services/endpoints.js';

export default async function getUserData(userId, useApi) {
    if (useApi == false) {
        return '';
    }
    const response = await fetch(ENDPOINTS.users({userId: userId}));
    const data = await response.json();
    console.log('getUserData request: ', data);
    return data;
}
