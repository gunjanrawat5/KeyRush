import React from 'react'
import crtImg from '../assets/crt.png'
const About = () => {
  return (
    <div style = {{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh', 
      testAlign: 'center', 
      padding: '0 20px' 
    }}> 

    <p className='text-[#F4F4F4]' style={{ maxWidth: '600px', fontSize: '1.2rem', lineHeight: '1.6' }}> 
      Welcome to KeyRush, in this application users will be able to use this practice typing tool, designed to help improve their typing speed and accuracy. When the user begins to type, a timer will start automatically and will measure their words per minute (WPM). This feature will help users track their progress throughout time. Since many job roles requires strong typing skills. This application was created to help out users build confidence and improve their typing performance, and overall professionalism. 

      

    </p>  
   </div>
  );
};

export default About