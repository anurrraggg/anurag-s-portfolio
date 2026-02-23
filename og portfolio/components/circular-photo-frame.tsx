"use client"

import { useState } from "react"
import { Camera, User } from "lucide-react"

export function CircularPhotoFrame() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-80 h-80 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer decorative rings */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-gentle-pulse"></div>
      <div className="absolute inset-2 rounded-full border border-primary/10"></div>

      {/* Main photo container */}
      <div
        className={`absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 transition-all duration-500 ${isHovered ? "scale-105 shadow-2xl shadow-primary/20" : "shadow-lg"}`}
      >
        {/* Photo container with headshot */}
        <div className="w-full h-full relative group">
          <img
            src="/professional-headshot-of-computer-science-student.jpg"
            alt="Anurag Pandey"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />

          {/* Subtle overlay accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent mix-blend-overlay"></div>

          {/* Upload overlay hint (kept but made more subtle) */}
          <div
            className={`absolute inset-0 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="text-center space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Camera className="w-6 h-6 mx-auto text-primary" />
              <p className="text-xs font-medium text-primary">Anurag Pandey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent elements */}
      <div
        className={`absolute top-8 right-8 w-3 h-3 rounded-full bg-primary/30 transition-all duration-700 ${isHovered ? "scale-150 bg-primary/50" : ""}`}
      ></div>
      <div
        className={`absolute bottom-12 left-6 w-2 h-2 rounded-full bg-primary/20 transition-all duration-500 delay-100 ${isHovered ? "scale-125 bg-primary/40" : ""}`}
      ></div>
      <div
        className={`absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-primary/25 transition-all duration-600 delay-200 ${isHovered ? "scale-150 bg-primary/45" : ""}`}
      ></div>
    </div>
  )
}
