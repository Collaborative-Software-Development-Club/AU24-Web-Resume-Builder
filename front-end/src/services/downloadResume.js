import {saveAs} from 'file-saver';
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    TabStopPosition,
    TabStopType,
} from 'docx';

// for some reason these sizes are double what they appear on word
const TEXT_COLOR = '#000000';
const NAME_SIZE = 38;
const CONTACTS_SIZE = 20;
const ITEM_HEADER_SIZE = 24;
const BULLET_SIZE = 20;
const SUBHEADING_SIZE = 22;
const TAB_STOP_POSITION = 12240;

//! a large part of this was generated with Claude 🤖

export function downloadResume(resumeData) {
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 720, // 0.5 inch
                            right: 720, // 0.5 inch
                            bottom: 720, // 0.5 inch
                            left: 720, // 0.5 inch
                        },
                    },
                },
                children: [...formatHeader(resumeData), ...formatSections(resumeData)],
            },
        ],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${resumeData.name.replace(/\s+/g, '_')}_Resume.docx`);
    });
}

function formatHeader(resumeData) {
    const {name, contactMethods} = resumeData;

    // Name with larger, bold font
    const nameElement = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: {
            after: 120,
        },
        children: [
            new TextRun({
                text: name,
                bold: true,
                size: NAME_SIZE,
                color: TEXT_COLOR,
            }),
        ],
    });

    // Contact methods centered with pipe separators
    const contactElement = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: {
            after: 200,
        },
        children: [
            new TextRun({
                text: contactMethods.join(' | '),
                size: CONTACTS_SIZE,
                color: TEXT_COLOR,
            }),
        ],
    });

    return [nameElement, contactElement];
}

function formatSectionHeader(title) {
    return new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: {
            before: 240,
            after: 120,
        },
        border: {
            bottom: {
                color: TEXT_COLOR,
                space: 1,
                style: BorderStyle.SINGLE,
                size: 10,
            },
        },
        children: [
            new TextRun({
                text: title.toUpperCase(),
                bold: true,
                color: TEXT_COLOR,
            }),
        ],
    });
}

function formatSections(resumeData) {
    const sections = [];

    for (const sectionKey of resumeData.orderOfSections) {
        switch (sectionKey) {
            case 'EDUCATION':
                if (resumeData.education.visible) {
                    sections.push(formatSectionHeader('Education'));
                    sections.push(...formatEducation(resumeData.education.content));
                }
                break;
            case 'EXPERIENCE':
                if (resumeData.experience.visible) {
                    sections.push(formatSectionHeader('Professional & Leadership Experience'));
                    sections.push(...formatExperience(resumeData.experience.content));
                }
                break;
            case 'PROJECTS':
                if (resumeData.projects.visible) {
                    sections.push(formatSectionHeader('Projects'));
                    sections.push(...formatProjects(resumeData.projects.content));
                }
                break;
            case 'SKILLS':
                if (resumeData.skills.visible) {
                    sections.push(formatSectionHeader('Skills'));
                    sections.push(...formatSkills(resumeData.skills.content));
                }
                break;
        }
    }

    return sections;
}

function formatEducation(education) {
    const {institution, location, degree, graduationDate, specialization, minor, gpa, honors} =
        education;

    // Institution and Location
    const institutionElement = new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TAB_STOP_POSITION,
            },
        ],
        children: [
            createItemHeading(institution),
            createItemHeading(location),
            // new TextRun({
            //     text: institution,
            //     bold: true,
            //     color: TEXT_COLOR,
            //     size: ITEM_HEADER_SIZE,
            // }),
            // new TextRun({
            //     text: '\t' + location,
            //     color: TEXT_COLOR,
            //     size: ITEM_HEADER_SIZE,
            // }),
        ],
    });

    // Degree, graduation date, minor
    let degreeText = degree;
    if (minor) degreeText += `, Minor in ${minor}`;

    const graduationText =
        graduationDate.month && graduationDate.year
            ? `${getMonthName(graduationDate.month)} ${graduationDate.year}`
            : graduationDate.year
              ? `${graduationDate.year}`
              : '';

    const degreeElement = new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TAB_STOP_POSITION,
            },
        ],
        children: [
            createSubheading(degreeText),
            createSubheading(graduationText ? `\t${graduationText}` : ''),
            // new TextRun({
            //     text: degreeText,
            //     color: TEXT_COLOR,
            //     size: SUBHEADING_SIZE,
            //     italics: true,
            // }),
            // new TextRun({
            //     text: graduationText ? `\t${graduationText}` : '',
            //     color: TEXT_COLOR,
            //     italics: true, // Make graduation date italic
            //     size: SUBHEADING_SIZE,
            // }),
        ],
    });

    // GPA and Specialization
    let gpaText = '';
    if (gpa) gpaText += `GPA: ${gpa}`;
    if (specialization) {
        if (gpaText) gpaText += ' | ';
        gpaText += `Specialization in ${specialization}`;
    }

    const elements = [institutionElement, degreeElement];

    if (gpaText) {
        elements.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: gpaText,
                        color: TEXT_COLOR,
                        size: BULLET_SIZE,
                    }),
                ],
            }),
        );
    }

    // Honors
    if (honors) {
        elements.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Awards and Honors: ${honors}`,
                        color: TEXT_COLOR,
                        size: BULLET_SIZE,
                    }),
                ],
            }),
        );
    }

    return elements;
}

function formatExperience(experience) {
    return experience.map((item) => formatExperienceItem(item)).flat();
}

function formatExperienceItem(item) {
    const {company, position, location, startDate, endDate, description} = item;

    // Company and Location
    const companyElement = new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TAB_STOP_POSITION,
            },
        ],
        spacing: {
            before: 160,
        },
        children: [
            new TextRun({
                text: company,
                bold: true,
                color: TEXT_COLOR,
                size: ITEM_HEADER_SIZE,
            }),
            new TextRun({
                text: location ? `\t${location}` : '',
                color: TEXT_COLOR,
                size: ITEM_HEADER_SIZE,
            }),
        ],
    });

    // Position and Date
    const dateText = formatDateRange(startDate, endDate);

    const positionElement = new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TAB_STOP_POSITION,
            },
        ],
        children: [
            createSubheading(position),
            createSubheading(dateText ? `\t${dateText}` : ''),
            // new TextRun({
            //     text: position,
            //     italics: true,
            //     color: TEXT_COLOR,
            //     size: SUBHEADING_SIZE,
            // }),
            // new TextRun({
            //     text: dateText ? `\t${dateText}` : '',
            //     color: TEXT_COLOR,
            //     italics: true, // Make date range italic
            //     size: SUBHEADING_SIZE,
            // }),
        ],
    });

    const elements = [companyElement, positionElement];

    // Description - make each line a bullet point automatically
    if (description) {
        elements.push(...createBulletPoints(description));
    }

    return elements;
}

function formatProjects(projects) {
    return projects.map((item) => formatProjectItem(item)).flat();
}

function formatProjectItem(item) {
    const {title, organization, location, startDate, endDate, description} = item;

    // Title with links
    const dateText = formatDateRange(startDate, endDate);

    const titleElement = new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TAB_STOP_POSITION,
            },
        ],
        spacing: {
            before: 160,
        },
        children: [
            new TextRun({
                text: title,
                bold: true,
                color: TEXT_COLOR,
                size: ITEM_HEADER_SIZE,
            }),
            createSubheading(dateText ? `\t${dateText}` : ''),
            // new TextRun({
            //     text: location ? `\t${location}` : '',
            //     color: TEXT_COLOR,
            //     italics: true, // Make location italic
            //     size: ITEM_HEADER_SIZE,
            // }),
        ],
    });

    // Organization and Date

    const elements = [titleElement];

    if (organization || location) {
        elements.push(
            new Paragraph({
                tabStops: [
                    {
                        type: TabStopType.RIGHT,
                        position: TAB_STOP_POSITION,
                    },
                ],
                children: [
                    createSubheading(organization || ''),
                    new TextRun({
                        text: location ? `\t${location}` : '',
                        color: TEXT_COLOR,
                        italics: true, // Make location italic
                        size: ITEM_HEADER_SIZE,
                    }),
                    // createSubheading(dateText ? `\t${dateText}` : ''),
                    // new TextRun({
                    //     text: organization || '',
                    //     italics: true,
                    //     color: TEXT_COLOR,
                    //     size: SUBHEADING_SIZE,
                    // }),
                    // new TextRun({
                    //     text: dateText ? `\t${dateText}` : '',
                    //     color: TEXT_COLOR,
                    //     italics: true, // Make date range italic
                    //     size: SUBHEADING_SIZE,
                    // }),
                ],
            }),
        );
    }

    // Description - make each line a bullet point automatically
    if (description) {
        elements.push(...createBulletPoints(description));
    }

    return elements;
}

function formatSkills(skills) {
    const elements = [];

    // If there are no categories, just list all skills
    if (skills.length > 0) {
        elements.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `• ${skills.map((skill) => skill).join(', ')}`,
                        color: TEXT_COLOR,
                        size: BULLET_SIZE,
                    }),
                ],
            }),
        );
    }

    return elements;
}

// Helper Functions
function formatDateRange(startDate, endDate) {
    const startText = formatDate(startDate);
    let endText = formatDate(endDate);

    if (!endText) {
        endText = 'Present';
    }

    if (startText && endText) {
        return `${startText} - ${endText}`;
    } else if (endText) {
        return endText;
    } else if (startText) {
        return startText;
    }

    return '';
}

function formatDate(dateObj) {
    if (!dateObj) return '';

    if (dateObj.month && dateObj.year) {
        return `${getMonthName(dateObj.month)} ${dateObj.year}`;
    } else if (dateObj.year) {
        return `${dateObj.year}`;
    }

    return '';
}

function getMonthName(monthNum) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return months[monthNum - 1] || '';
}

function createItemHeading(text) {
    return new TextRun({
        text: text,
        bold: true,
        color: TEXT_COLOR,
        size: ITEM_HEADER_SIZE,
    });
}

function createSubheading(text) {
    return new TextRun({
        text: text,
        color: TEXT_COLOR,
        size: SUBHEADING_SIZE,
        italics: true,
    });
}

function createBulletPoints(text) {
    const lines = text.split('\n').filter((line) => line.trim() !== '');

    return lines.map((line) => {
        // Always add a bullet point at the beginning
        const bulletText = line.trim().startsWith('•') ? line.trim() : `• ${line.trim()}`;

        return new Paragraph({
            indent: {
                left: 360,
                hanging: 360,
            },
            children: [
                new TextRun({
                    text: bulletText,
                    color: TEXT_COLOR,
                    size: BULLET_SIZE,
                }),
            ],
        });
    });
}
