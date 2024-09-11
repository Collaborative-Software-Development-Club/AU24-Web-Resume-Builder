import jsonData from '../../../data/resume.json'
export default function ResumeBuilder() {
    console.log(jsonData)
    return <p>{JSON.stringify(jsonData)}</p>
}