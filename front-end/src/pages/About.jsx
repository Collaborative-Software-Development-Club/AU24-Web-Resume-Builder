import React from 'react'
import AITextImprovementButton from '@/components/ui/AITextImprovementButton'

//test AI text improvement button
const About = () => {
  return (
    <div>About
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AITextImprovementButton placeholder="Improve this text" /></div>
    </div>
  )
}

export default About