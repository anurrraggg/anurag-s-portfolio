"use client"

import { useEffect, useRef } from "react"

export function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.005

      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Create gradient mesh
      const gradient1 = ctx.createRadialGradient(
        canvas.offsetWidth * 0.8 + Math.sin(time) * 50,
        canvas.offsetHeight * 0.3 + Math.cos(time * 0.8) * 30,
        0,
        canvas.offsetWidth * 0.8,
        canvas.offsetHeight * 0.3,
        200,
      )
      gradient1.addColorStop(0, "rgba(6, 182, 212, 0.1)")
      gradient1.addColorStop(1, "rgba(6, 182, 212, 0)")

      const gradient2 = ctx.createRadialGradient(
        canvas.offsetWidth * 0.9 + Math.cos(time * 1.2) * 40,
        canvas.offsetHeight * 0.7 + Math.sin(time * 0.6) * 60,
        0,
        canvas.offsetWidth * 0.9,
        canvas.offsetHeight * 0.7,
        150,
      )
      gradient2.addColorStop(0, "rgba(99, 102, 241, 0.08)")
      gradient2.addColorStop(1, "rgba(99, 102, 241, 0)")

      // Draw gradients
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "multiply" }}
    />
  )
}
