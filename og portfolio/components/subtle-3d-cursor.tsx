"use client"

import { useEffect, useState } from "react"

export function Subtle3DCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.closest === "function" && target.closest("button, a, .interactive")) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.closest === "function" && target.closest("button, a, .interactive")) {
        setIsHovering(false)
      }
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: `scale(${isHovering ? 1.5 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
    </div>
  )
}
