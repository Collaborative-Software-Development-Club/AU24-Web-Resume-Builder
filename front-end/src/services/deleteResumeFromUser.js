export default async function deleteResumeFromUser(userId, resumeId) {
    console.log('deleting resume data from user');

    const response = await fetch(`http://localhost:8080/users/${userId}/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log('Item deleted successfully from user');
        // Optionally, handle the response or update the UI
    } else {
        console.error('Failed to delete item from user');
    }
}
