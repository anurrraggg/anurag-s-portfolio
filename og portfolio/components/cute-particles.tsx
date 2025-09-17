"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  delay: number
}

export function CuteParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const cuteEmojis = ["✨", "💫", "⭐", "🌟", "💖", "🦋", "🌸", "🍃"]

    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()

    const interval = setInterval(() => {
      generateParticles()
    }, 10000) // Regenerate every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-lg opacity-30"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y - 200],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default CuteParticles
