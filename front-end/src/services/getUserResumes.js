export async function getUserResumes(userId) {
    const response = await fetch(`http://localhost:8080/resume?userId=${userId}`);
    // console.log(response);
    if (response.status == 204) {
        return [];
    }
    const data = await response.json();
    // console.log(data);
    return data;
}
