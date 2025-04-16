import {ENDPOINTS} from '@/services/endpoints.js';

export function resumeQueries(authHeader) {
    return {
        create: async function ({userId, resumeId}) {
            const response = await fetch(ENDPOINTS.resumes(), {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: authHeader,
                },
                body: JSON.stringify({
                    userId,
                    resumeId,
                }),
            });
            // console.log('response', response);
            const data = await response.json();
            // console.log('data', data.details);
            if (!response.ok) {
                throw new Error(
                    `failed to create resume: ${response.status} ${response.statustext}\n${data.details}`,
                );
            }
            return data;
        },

        delete: async function (resumeId) {
            const response = await fetch(ENDPOINTS.resumes({resumeId: resumeId}), {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    Authorization: authHeader,
                },
            });
            if (response.ok) {
                console.log('Item deleted successfully');
            } else {
                throw new Error(
                    `Failed to delete resume: ${response.status} ${response.statusText}\n${await response.json()}`,
                );
            }
        },

        getOne: async function (resumeId) {
            const response = await fetch(ENDPOINTS.resumes({resumeId: resumeId}), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    `Failed to get resume: ${response.status} ${response.statusText}\n${data.details}`,
                );
            }
            return data;
        },

        getFromUser: async function (userId) {
            const response = await fetch(ENDPOINTS.resumes({userId: userId}), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader,
                },
            });
            console.log(response);
            if (response.status == 204) {
                return [];
            }
            const data = await response.json();
            return data;
        },

        upload: async function (resumeId, resumeData) {
            const response = await fetch(ENDPOINTS.resumes({resumeId: resumeId}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authHeader,
                },
                body: JSON.stringify(resumeData),
            });
            // console.log('response: ', response);
            const data = await response.json();
            // console.log('data returned: ');
            // console.log(data);
            if (response.ok) {
                return data;
            } else {
                const message = `Failed to update resume: ${response.status} ${response.statusText} ${JSON.stringify(data)}`;
                console.error(message);
                throw new Error(message);
            }
        },
    };
}
