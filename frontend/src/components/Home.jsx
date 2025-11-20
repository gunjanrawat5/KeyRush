import React, { useEffect, useState } from 'react'
import Typing from './Typing'
import keyboard from '../assets/keyboard.png'

const Home = () => {
  const [seconds,setSeconds] = useState(30)
  useEffect(()=>{
      if (seconds<=0) return
      const interval = setInterval(()=>{
        setSeconds(prev => prev-1)
      },1000)
      return () => clearInterval(interval);
    },[seconds])
  
  return (
    <div className=' text-[#fffffffb] text-2xl font-[Quantico]'>

      <div className=' flex flex-col justify-center items-center mt-30 text-[#ffffff44]'>
        <button className='text-white'>{seconds}</button>
        <Typing></Typing>
        <img className='w-2/3' src={keyboard}/>
      </div>
      
    </div>
  )
}

export default Home