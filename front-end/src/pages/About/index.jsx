import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center pt-10 gap-6 ">
      <h1 className="text-5xl font-bold ">AI RESUME BUILDER</h1>
      <p className="text-xl">Create a resume in seconds with our AI resume builder!</p>
      <Button className="bg-blue-500 text-white" onClick={() => navigate('/guest')}>Create Resume</Button>
    </div>
  )
}

export default About