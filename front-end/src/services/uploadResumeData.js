export default async function uploadResumeData(resumeId, resumeData) {
    console.log('uploading resume data');
    const response = await fetch(`http://localhost:8080/resume/${resumeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    });
    // console.log('response: ', response);
    const data = await response.json();
    console.log('data returned: ');
    console.log(data);
    if (response.ok) {
        return data;
    } else {
        throw new Error(
            `Failed to update resume: ${response.status} ${response.statusText} ${JSON.stringify(data)}`,
        );
    }
}
