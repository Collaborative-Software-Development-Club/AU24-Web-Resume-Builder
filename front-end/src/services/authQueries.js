import {ENDPOINTS} from '@/services/endpoints.js';

export const AUTH_QUERIES = authQueries(ENDPOINTS);

function authQueries(endpoints) {
    return {
        login: async function (authData) {
            const response = await fetch(endpoints.auth.login(), {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(authData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    `failed to create resume: ${response.status} ${response.statustext}\n${data.details}`,
                );
            }
            return data;
        },

        register: async function (authData) {
            const response = await fetch(endpoints.auth.register(), {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(authData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `failed to create resume: ${response.status} ${response.statustext}\n${errorData.details}`,
                );
            }
        },
    };
}
