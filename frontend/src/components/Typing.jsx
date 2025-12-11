import React, { useEffect, useState } from 'react'

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quisquam quibusdam, iste placeat, veritatis esse molestias magnam repellat nam nostrum facilis cum, repudiandae quam labore enim voluptate corrupti commodi nulla accusamus! Porro at recusandae doloremque, consequatur rerum a, dolorum ut pariatur fugit perspiciatis tempore. Tenetur."

const Typing = ({ onStart }) => {
  const [index, setIndex] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key

      // ignore non-character keys (Shift, Ctrl, etc.)
      if (key.length !== 1 && key !== ' ') return

      // first key => start timer
      if (!started) {
        setStarted(true)
        if (typeof onStart === 'function') onStart()
      }

      setIndex(prevIndex => {
        if (prevIndex >= text.length) return prevIndex

        const expectedChar = text[prevIndex]
        const pressed = key.toLowerCase()
        const expected = expectedChar.toLowerCase()

        if (pressed === expected) {
          setWrong(false)
          return prevIndex + 1
        } else {
          setWrong(true)
          return prevIndex
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [started, onStart]) // text is constant, no need in deps

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
