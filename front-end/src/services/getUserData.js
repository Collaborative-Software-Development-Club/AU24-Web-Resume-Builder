export default async function getUserData(userId, useApi) {
    if (useApi == false) {
        return '';
    }
    const response = await fetch(`http://localhost:8080/users/${userId}`);
    const data = await response.json();
    console.log(data);
    return data;
}
