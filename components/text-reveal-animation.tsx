"use client"

import { useEffect, useRef, useState } from "react"

interface TextRevealAnimationProps {
  text: string
  className?: string
  delay?: number
}

export function TextRevealAnimation({ text, className = "", delay = 0 }: TextRevealAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-transform duration-1000 ease-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
              animationDelay: `${index * 50}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  )
}
