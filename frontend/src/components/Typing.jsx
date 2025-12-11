import React, { useEffect, useState } from 'react'

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quisquam quibusdam, iste placeat, veritatis esse molestias magnam repellat nam nostrum facilis cum, repudiandae quam labore enim voluptate corrupti commodi nulla accusamus! Porro at recusandae doloremque, consequatur rerum a, dolorum ut pariatur fugit perspiciatis tempore. Tenetur."

const Typing = ({ onStart, isActive, onStatsChange }) => {
  const [index, setIndex] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [started, setStarted] = useState(false)
  const [totalTyped, setTotalTyped] = useState(0)

  useEffect(() => {
    if (typeof onStatsChange === 'function') {
      onStatsChange({ correct: 0, total: 0 })
    }
  }, [onStatsChange])
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return
      const key = e.key

      // ignore non-character keys (Shift, Ctrl, etc.)
      if (key.length !== 1 && key !== ' ') return

      // first key => start timer
      if (!started) {
        setStarted(true)
        if (typeof onStart === 'function') onStart()
      }
      if (index >= text.length) return

      const expectedChar = text[index]
      const pressed = key.toLowerCase()
      const expected = expectedChar.toLowerCase()

      const newTotal = totalTyped + 1
      let newIndex = index

      if (pressed === expected) {
        newIndex = index + 1
        setWrong(false)
      } else {
        setWrong(true)
      }

      setIndex(newIndex)
      setTotalTyped(newTotal)

      if (typeof onStatsChange === 'function') {
        onStatsChange({ correct: newIndex, total: newTotal })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, started, index, totalTyped, onStart, onStatsChange])

  return (
    <div className="w-2/3 tracking-wider text-3xl">
      <p>
        {text.split('').map((ch, i) => {
          let cls = 'text-[#ffffff33]'

          if (i < index) {
            cls = 'text-white'
          } else if (i === index && wrong) {
            cls = 'text-red-500'
          }

          return (
            <span key={i} className={cls}>
              {ch}
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default Typing
