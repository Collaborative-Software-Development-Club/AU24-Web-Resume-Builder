export const DEFAULT_RESUME = {
    name: '',
    contactMethods: [],
    education: {
        visible: true,
        content: {
            institution: '',
            location: '',
            degree: '',
            graduationDate: {
                month: 0,
                year: 0,
            },
            specialization: '',
            minor: '',
            gpa: 0,
            honors: [],
        },
    },
    experience: {
        visible: true,
        content: [
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
        content: [
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
        content: [],
    },
    orderOfSections: ['EDUCATION', 'EXPERIENCE', 'PROJECTS', 'SKILLS'],
};
