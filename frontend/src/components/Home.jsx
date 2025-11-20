import React, { useEffect, useState } from 'react'
import Typing from './Typing'

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

      <div className=' flex flex-col justify-center items-center mt-80 text-[#ffffff44]'>
        <button className='text-white'>{seconds}</button>
        <Typing></Typing>
      </div>
      
    </div>
  )
}

export default Home