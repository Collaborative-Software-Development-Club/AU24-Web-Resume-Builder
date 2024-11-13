export default async function uploadResumeData(resumeId, resumeData) {
    console.log('uploading resume data');
    const response = await fetch(`http://localhost:8080/resume/${resumeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    });
    console.log('response: ', response);
    const data = await response.json();
    console.log('data returned: ');
    console.log(data);
    return data;
}
