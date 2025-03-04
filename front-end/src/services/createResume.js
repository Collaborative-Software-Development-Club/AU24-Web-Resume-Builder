export default async function createResume(userId, resumeData = {}) {
    const response = await fetch(`http://localhost:8080/resume?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    });
    if (!response.ok) {
        throw new Error(`Failed to create resume: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}
