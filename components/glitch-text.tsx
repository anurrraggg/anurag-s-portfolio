"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        setIsGlitching(true)

        let iterations = 0
        const glitchInterval = setInterval(() => {
          setGlitchText(
            text
              .split("")
              .map((char, index) => {
                if (index < iterations) {
                  return text[index]
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)]
              })
              .join(""),
          )

          if (iterations >= text.length) {
            clearInterval(glitchInterval)
            setGlitchText(text)
            setIsGlitching(false)
          }

          iterations += 1 / 2
        }, 20) // Decreased from 30ms to 20ms for faster character transitions
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={`${className} ${isGlitching ? "text-primary" : ""} transition-colors duration-100`}>
      {glitchText}
    </span>
  )
}
