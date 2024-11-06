export default async function uploadResumeData(resumeId, resumeData) {
    console.log('uploading resume data');
    const response = await fetch(`http://localhost:8080/resume/${resumeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    });
    const data = await response.json();
    return data;
}
