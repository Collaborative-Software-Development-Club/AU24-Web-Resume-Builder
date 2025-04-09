import jsonData from '@/../../data/resume.json';

export async function getResumeData(resumeId, {useApi}) {
    if (useApi === false) {
        return jsonData;
    }
    const response = await fetch(`http://localhost:8080/resume/${resumeId}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(
            `Failed to get resume: ${response.status} ${response.statusText}\n${data.details}`,
        );
    }
    return data;
}
