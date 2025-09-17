"use client"

import { useEffect, useState } from "react"

const skills = ["React", "Node.js", "Blockchain", "Machine Learning", "TypeScript", "Python"]

export function FloatingTextAnimation() {
  const [currentSkill, setCurrentSkill] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute top-20 right-10 hidden lg:block">
      <div className="text-sm text-muted-foreground/60 font-mono">
        <span className="opacity-50">expertise:</span>
        <span className="ml-2 text-primary animate-pulse">{skills[currentSkill]}</span>
      </div>
    </div>
  )
}
