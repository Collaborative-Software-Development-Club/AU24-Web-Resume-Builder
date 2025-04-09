export default async function deleteResumeData(resumeId) {
    console.log('deleting resume data');

    const response = await fetch(`http://localhost:8080/resume/${resumeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log('Item deleted successfully');
    } else {
        throw new Error(
            `Failed to get resume: ${response.status} ${response.statusText}\n${await response.json()}`,
        );
    }
}
