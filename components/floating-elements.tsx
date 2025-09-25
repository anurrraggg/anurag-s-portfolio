"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating geometric shapes that follow mouse */}
      <div
        className="absolute w-2 h-2 bg-primary/20 rounded-full transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x + 50,
          top: mousePos.y + 50,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-1 h-1 bg-accent/30 rounded-full transition-all duration-1500 ease-out"
        style={{
          left: mousePos.x - 30,
          top: mousePos.y - 30,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-3 h-3 border border-primary/10 rounded-full transition-all duration-2000 ease-out"
        style={{
          left: mousePos.x + 80,
          top: mousePos.y - 60,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Static floating elements for empty space */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full animate-pulse" />
      <div
        className="absolute top-1/3 right-1/6 w-2 h-2 bg-primary/20 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-6 h-6 border border-primary/5 rounded-full animate-spin"
        style={{ animationDuration: "20s" }}
      />
      <div
        className="absolute top-2/3 right-1/5 w-1 h-1 bg-accent/30 rounded-full animate-ping"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
