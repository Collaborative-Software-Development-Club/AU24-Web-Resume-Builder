export default async function uploadResumeToUser(userId, resumeId) {
    console.log('uploading resume data to User');

    const response = await fetch(`http://localhost:8080/users/${userId}/resumes/${resumeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to upload resume to user: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}
