import {saveAs} from 'file-saver';
import {Document, Packer, Paragraph, TextRun} from 'docx';

export function downloadResume(resumeData) {
    console.log(resumeData);
    const asString = parseWholeResume(resumeData);
    console.log(asString);
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // formatName(resumeData.name),
                    // formatContactMethods(resumeData.contactMethods),
                    // ...formatEducation(resumeData.education),
                    // formatSkills(resumeData.skills),
                    // ...formatExperience(resumeData.experience),
                    // ...formatProjects(resumeData.projects),
                    // formatSkills(resumeData.skills),
                    ...asString.map((item) => createLine(item)),
                ],
            },
        ],
    });
    console.log(doc);
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'resume.docx');
    });
}

function formatName(name) {
    return new Paragraph({
        children: [new TextRun({text: name})],
    });
}

function formatContactMethods(contactMethods) {
    return new Paragraph({
        children: [new TextRun({text: contactMethods.join(' | ')})],
    });
}

function formatExperience(experience) {
    return experience.items.map((item) => [new Paragraph({children: [new TextRun({text: item.company})]}), new Paragraph({children: [new TextRun({text: item.position})]})]).flat();
}

function formatProjects(projects) {
    return projects.items.map((item) => [new Paragraph({children: [new TextRun({text: item.company})]}), new Paragraph({children: [new TextRun({text: item.position})]})]).flat();
}

function formatSkills(skills) {
    return new Paragraph({children: [new TextRun(skills.items.map((skill) => skill.skillName).join(', '))]});
}

function formatEducation(education) {
    // return [new Paragraph({children: [new TextRun({text: education.institution})]}), new Paragraph([new TextRun({text: education.degree})])];
    return [createLine(education.institution), createLine(education.degree), createLine(education.gpa)];
}

function createLine(text) {
    return new Paragraph({children: [new TextRun({text: text})]});
}

function parseWholeResume(resume) {
    const values = Object.values(resume);
    const notUndefined = values.filter((value) => value != undefined);
    const result = notUndefined.map((value) => {
        if (typeof value === 'object') {
            return parseWholeResume(value);
        } else {
            return value;
        }
    });
    return result.flat();
}
