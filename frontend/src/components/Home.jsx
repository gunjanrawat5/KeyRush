import React, { useEffect, useState } from 'react'
import Typing from './Typing'
import keyboard from '../assets/keyboard.png'

const Home = () => {
  const [seconds,setSeconds] = useState(30)
  const [hasStarted, setHasStarted] = useState(false)
  useEffect(()=>{
      if (!hasStarted) return 
      if (seconds<=0) return
      const interval = setInterval(()=>{
        setSeconds(prev => prev-1)
      },1000)
      return () => clearInterval(interval);
    },[hasStarted,seconds])
  
  return (
    <div className=' text-[#fffffffb] text-2xl font-[Quantico]'>

      <div className=' flex flex-col justify-center items-center mt-40'>
        <button className='text-white'>{seconds}</button>
        <Typing onStart={() => setHasStarted(true)} />
      </div>
      
    </div>
  )
}

export default Home