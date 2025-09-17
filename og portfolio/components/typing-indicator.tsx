"use client"

import { useState, useEffect } from "react"

export function TypingIndicator() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 bg-background/80 backdrop-blur-sm border rounded-full px-4 py-2 text-sm text-muted-foreground z-50">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Available for work{dots}</span>
      </div>
    </div>
  )
}
