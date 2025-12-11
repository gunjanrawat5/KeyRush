import React, { useEffect, useState } from 'react'
import Typing from './Typing'
import keyboard from '../assets/keyboard.png'


const INITIAL_TIME = 30

const Home = () => {
  const [seconds,setSeconds] = useState(INITIAL_TIME)
  const [hasStarted, setHasStarted] = useState(false)
  const [round, setRound] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  const [stats, setStats] = useState({ correct: 0, total: 0 })
  const { correct, total } = stats

  useEffect(()=>{
      if (!hasStarted) return 
      if (seconds<=0) return
      const interval = setInterval(()=>{
        setSeconds(prev => prev-1)
        setElapsed(prev => prev + 1)
      },1000)
      return () => clearInterval(interval);
    },[hasStarted,seconds])

  const handleStart = () => {
    // called from Typing on first key press
    setHasStarted(true)
  }

  const handleReset = () => {
    setSeconds(INITIAL_TIME)
    setHasStarted(false)
    setRound(prev => prev + 1) // forces Typing to remount and clear its state
    setElapsed(0)
    setStats({ correct: 0, total: 0 }) // clear stats
  }

  const isActive = seconds > 0
  const accuracy = total > 0 ? (correct / total) * 100 : 0
  const minutes = elapsed > 0 ? elapsed / 60 : 0
  const wpm = minutes > 0 ? (correct / 5) / minutes : 0
  
  return (
    <div className=' text-[#fffffffb] text-2xl font-[Quantico]'>

      <div className=' flex flex-col justify-center items-center mt-30'>
         <div className="flex items-center gap-200 mb-2">
          <button className="text-white text-3xl">
            {seconds}
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="px-4 py-1 border border-white/40 rounded-md text-base hover:bg-white/10"
          >
            Reset
          </button>
        </div>
        <div className="flex gap-8 text-lg m-5">
          <div>
            <span className="text-white">Accuracy: </span>
            {accuracy.toFixed(1)}%
          </div>
          <div>
            <span className="text-white">WPM: </span>
            {wpm.toFixed(1)}
          </div>
        </div>

        {/* Optional: show message when time is up */}
        {seconds === 0 && (
          <div className="text-red-400 text-lg mb-3">
            Time&apos;s up! Press Reset to try again.
          </div>
        )}
        <Typing
          key={round}          // remount on reset
          onStart={handleStart}
          isActive={isActive}  // disable typing when false
          onStatsChange={setStats}
        />
      </div>
      
    </div>
  )
}

export default Home