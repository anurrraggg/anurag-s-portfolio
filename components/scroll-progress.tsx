"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-background/50 backdrop-blur-sm z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  )
}
