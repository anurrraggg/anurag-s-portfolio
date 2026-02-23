"use client"

import { Button } from "@/components/ui/button"
import { CircularPhotoFrame } from "@/components/circular-photo-frame"
import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react"
import { useState } from "react"

export function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground font-mono text-sm animate-gentle-pulse">Hey there, I'm</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">Anurag Pandey</h1>
            </div>

            <p className="text-xl lg:text-2xl text-foreground font-medium text-balance">
              CS student crafting meaningful tech through algorithms, ML, and blockchain.
            </p>

            <p className="text-lg text-muted-foreground max-w-lg text-pretty leading-relaxed">
              I'm a CS student drawn to elegant algorithms and machine learning's pattern finding magic. I'm exploring how these technologies, along with decentralized systems, can solve real problems and create genuine value.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="group interactive-card"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              See my work
              <ArrowDown
                className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-y-1" : ""}`}
              />
            </Button>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/anurrraggg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors duration-300">
                  <Github className="h-5 w-5" />
                </Button>
              </a>

             

              <a
                href="https://www.linkedin.com/in/anurrraggg/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>

              <a
                href="mailto:anuragpandey@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </a>

            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CircularPhotoFrame />
        </div>
      </div>
    </section>
  )
}
