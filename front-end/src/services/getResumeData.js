import jsonData from '@/../../data/resume.json';

export default async function getResumeData({useApi}) {
    if (useApi == false) {
        return jsonData;
    }
    const response = await fetch('http://localhost:8080/0');
    const data = await response.json();
    console.log(data);
    return data;
}
