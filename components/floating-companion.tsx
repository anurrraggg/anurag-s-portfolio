"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingCompanion() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState("hero")
  const [isHovering, setIsHovering] = useState(false)
  const [expression, setExpression] = useState("happy")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smooth follow with delay
      setTimeout(() => {
        setPosition({
          x: e.clientX - 25,
          y: e.clientY - 25,
        })
      }, 100)
    }

    const handleScroll = () => {
      const sections = ["hero", "about", "work", "contact"]
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const sectionIndex = Math.floor(scrollY / windowHeight)
      const newSection = sections[Math.min(sectionIndex, sections.length - 1)]

      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        // Change expression based on section
        switch (newSection) {
          case "hero":
            setExpression("happy")
            break
          case "about":
            setExpression("curious")
            break
          case "work":
            setExpression("excited")
            break
          case "contact":
            setExpression("friendly")
            break
        }
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [currentSection])

  const getCompanionEmoji = () => {
    switch (expression) {
      case "happy":
        return "😊"
      case "curious":
        return "🤔"
      case "excited":
        return "🚀"
      case "friendly":
        return "👋"
      default:
        return "😊"
    }
  }

  const getCompanionColor = () => {
    switch (currentSection) {
      case "hero":
        return "from-cyan-400 to-blue-500"
      case "about":
        return "from-purple-400 to-pink-500"
      case "work":
        return "from-green-400 to-emerald-500"
      case "contact":
        return "from-orange-400 to-red-500"
      default:
        return "from-cyan-400 to-blue-500"
    }
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <motion.div
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCompanionColor()} 
                   flex items-center justify-center shadow-lg backdrop-blur-sm
                   border border-white/20`}
        animate={{
          rotate: isHovering ? 360 : 0,
          y: [0, -5, 0],
        }}
        transition={{
          rotate: { duration: 0.5 },
          y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      >
        <motion.span
          className="text-lg"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {getCompanionEmoji()}
        </motion.span>
      </motion.div>

      {/* Cute trail effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Section indicator */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                       bg-black/80 text-white text-xs px-2 py-1 rounded-full
                       whitespace-nowrap backdrop-blur-sm"
          >
            {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
