"use client"

import { useEffect, useState } from "react"

export function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const updateFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(updateFPS)
    }

    // Show monitor only in development or when explicitly enabled
    const isDev = process.env.NODE_ENV === "development"
    if (isDev) {
      setShowMonitor(true)
      updateFPS()
    }

    // Toggle monitor with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        setShowMonitor((prev) => !prev)
        if (!showMonitor) updateFPS()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [showMonitor])

  if (!showMonitor) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-xs font-mono backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${fps > 50 ? "bg-green-500" : fps > 30 ? "bg-yellow-500" : "bg-red-500"}`}
        />
        <span>{fps} FPS</span>
      </div>
    </div>
  )
}
