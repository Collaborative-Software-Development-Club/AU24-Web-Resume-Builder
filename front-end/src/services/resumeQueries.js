import {ENDPOINTS} from '@/services/endpoints.js';
import jsonData from '@/../../data/resume.json';

export const RESUME_QUERIES = resumeQueries(ENDPOINTS);

function resumeQueries(endpoints) {
    return {
        create: async function ({userId, resumeId}) {
            const response = await fetch(endpoints.resumes(), {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
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
            console.log('deleting resume data');

            const response = await fetch(endpoints.resumes({resumeId: resumeId}), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Item deleted successfully');
            } else {
                throw new Error(
                    `Failed to get resume: ${response.status} ${response.statusText}\n${await response.json()}`,
                );
            }
        },

        getOne: async function (resumeId) {
            const response = await fetch(endpoints.resumes({resumeId: resumeId}));
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    `Failed to get resume: ${response.status} ${response.statusText}\n${data.details}`,
                );
            }
            return data;
        },

        getFromUser: async function (userId) {
            const response = await fetch(endpoints.resumes({userId: userId}));
            console.log(response);
            if (response.status == 204) {
                return [];
            }
            const data = await response.json();
            console.log(data);
            return data;
        },

        upload: async function (resumeId, resumeData) {
            console.log('uploading resume data');
            const response = await fetch(endpoints.resumes({resumeId: resumeId}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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
                throw new Error(
                    `Failed to update resume: ${response.status} ${response.statusText} ${JSON.stringify(data)}`,
                );
            }
        },
    };
}
