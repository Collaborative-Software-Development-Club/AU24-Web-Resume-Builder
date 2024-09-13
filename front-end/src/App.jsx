import '@/App.css'
import ResumeBuilder from '@/pages/ResumeBuilder'

function App() {
  return (
    <div className='flex flex-col justify-center items-center p-10'>
        <h1 className="text-2xl font-bold">AU24 resume builder project</h1>
        <ResumeBuilder />
    </div>
  )
}

export default App
