"use client"

import { useEffect, useState } from "react"

interface Dot {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export function FloatingDots() {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    // Create initial dots
    const initialDots: Dot[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
    }))
    setDots(initialDots)

    // Animate dots
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          y: dot.y <= -5 ? 105 : dot.y - dot.speed,
          opacity: Math.sin(Date.now() * 0.001 + dot.id) * 0.2 + 0.3,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transition: "opacity 0.3s ease",
          }}
        />
      ))}
    </div>
  )
}
