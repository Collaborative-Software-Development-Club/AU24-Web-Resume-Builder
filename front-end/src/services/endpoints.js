import flags from '@/flags.json';

function endpoints(baseUrl, version) {
    return {
        resumes: ({resumeId, userId} = {}) => {
            if (resumeId) {
                return `${baseUrl}/${version}/resumes/${resumeId}`;
            }
            if (userId) {
                return `${baseUrl}/${version}/resumes?userId=${userId}`;
            }
            return `${baseUrl}/${version}/resumes`;
        },
        users: ({userId}) => {
            if (userId) {
                return `${baseUrl}/${version}/users/${userId}`;
            }
            return `${baseUrl}/${version}/users`;
        },
        auth: {
            register: () => `${baseUrl}/${version}/auth/register`,
            login: () => `${baseUrl}/${version}/auth/login`,
        },
        ai: {
            resume: () => `${baseUrl}/${version}/ai/resume`,
            description: ({text}) => `${baseUrl}/${version}/ai/description?message=${text}`,
        },
    };
}

export const ENDPOINTS = endpoints(flags.apiUrl, flags.apiVersion);
