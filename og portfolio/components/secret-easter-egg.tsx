"use client"

import { useEffect, useState } from "react"

export function SecretEasterEgg() {
  const [isSecretMode, setIsSecretMode] = useState(false)
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    let sequence: string[] = []
    const secretSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "KeyA",
      "KeyN",
      "KeyU",
      "KeyR",
      "KeyA",
      "KeyG",
    ]

    const handleKeyPress = (e: KeyboardEvent) => {
      sequence.push(e.code)
      if (sequence.length > secretSequence.length) {
        sequence = sequence.slice(-secretSequence.length)
      }

      if (sequence.join(",") === secretSequence.join(",")) {
        setIsSecretMode(true)
        document.body.classList.add("secret-mode")

        // Generate matrix rain effect
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
        const matrixArray = Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)])
        setMatrixChars(matrixArray)

        setTimeout(() => {
          setIsSecretMode(false)
          document.body.classList.remove("secret-mode")
          setMatrixChars([])
        }, 10000)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  if (!isSecretMode) return null

  return (
    <div className="matrix-rain">
      {matrixChars.map((char, i) => (
        <div
          key={i}
          className="absolute text-green-400 text-sm font-mono animate-pulse"
          style={{
            left: `${(i * 2) % 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  )
}
