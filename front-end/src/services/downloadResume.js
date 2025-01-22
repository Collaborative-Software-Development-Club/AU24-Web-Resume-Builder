import {saveAs} from 'file-saver';
import {Document, Packer, Paragraph, TextRun} from 'docx';

export function downloadResume(resumeData) {
    console.log(resumeData);
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [new TextRun({text: resumeData.name})],
                    }),
                    new Paragraph({
                        children: [new TextRun({text: resumeData.contactMethods.join(' | ')})],
                    }),
                ],
            },
        ],
    });
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'resume.docx');
    });
}
