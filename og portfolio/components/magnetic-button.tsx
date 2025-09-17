"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "default",
  size = "default",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const distance = Math.sqrt(x * x + y * y)
      const maxDistance = 100

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance
        const moveX = x * strength * 0.3
        const moveY = y * strength * 0.3

        button.style.transform = `translate(${moveX}px, ${moveY}px)`
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = "translate(0px, 0px)"
    }

    button.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Button
      ref={buttonRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onClick={onClick}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  )
}
