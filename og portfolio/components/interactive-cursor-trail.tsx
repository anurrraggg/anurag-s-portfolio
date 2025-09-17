"use client"

import { useEffect, useState } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
}

export function InteractiveCursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let animationId: number
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
      }

      setTrail((prev) => [...prev.slice(-8), newPoint])
      setIsActive(true)

      clearTimeout(animationId)
      animationId = window.setTimeout(() => setIsActive(false), 100)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
      setTrail([])
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(animationId)
    }
  }, [])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-primary/30 rounded-full animate-ping"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: ((index + 1) / trail.length) * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
            animationDelay: `${index * 50}ms`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  )
}
