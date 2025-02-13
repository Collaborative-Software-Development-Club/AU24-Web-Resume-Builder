export const DEFAULT_RESUME = {
    name: '',
    contactMethods: [],
    education: {
        visible: true,
        institution: '',
        location: '',
        degree: '',
        graduationDate: {
            month: null,
            year: null,
        },
        specialization: '',
        minor: '',
        gpa: null,
        honors: [],
    },
    experience: {
        visible: true,
        items: [
            {
                id: 0,
                visible: true,
                company: '',
                description: '',
                location: '',
                position: '',
                startDate: {month: null, year: null},
                endDate: {month: null, year: null},
            },
        ],
    },
    projects: {
        visible: true,
        items: [
            {
                id: 0,
                visible: true,
                organization: '',
                description: '',
                location: '',
                title: '',
                startDate: {month: null, year: null},
                endDate: {month: null, year: null},
            },
        ],
    },
    skills: {
        visible: true,
        items: [],
    },
    orderOfSections: ['EDUCATION', 'EXPERIENCE', 'PROJECTS', 'SKILLS'],
};