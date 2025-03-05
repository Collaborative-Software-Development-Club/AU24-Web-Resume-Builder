export async function getUserResumes(userId) {
    const response = await fetch(`http://localhost:8080/resume?userId=${userId}`);
    const data = await response.json();
    return data;
}
