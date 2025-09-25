"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { GlitchText } from "./glitch-text"
import dynamic from "next/dynamic"
const Floating3DScene = dynamic(() => import("./floating-3d-scene").then((m) => m.Floating3DScene), {
  ssr: false,
})
import { GradientMeshBackground } from "./gradient-mesh-background"
import { FloatingDots } from "./floating-dots"

export function HeroSection() {
  const scrollToWork = () => {
    const workSection = document.getElementById("work")
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <GradientMeshBackground />
      </div>

      <div className="absolute right-0 top-0 w-1/2 h-full">
        <FloatingDots />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full">
        <Floating3DScene />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in-up">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-2">
              Hi, I&#39;m <GlitchText text="Anurag Pandey" className="text-foreground font-semibold" />
              <span className="animate-pulse text-primary">|</span>
            </h2>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient-x">
              Full Stack
            </span>
            <span className="text-primary block hover:scale-105 transition-transform duration-300 cursor-default">
              Developer
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up animate-delay-100">
          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate about crafting innovative digital solutions with expertise in blockchain technology and machine
            learning. I build scalable applications that push the boundaries of what&#39;s possible.
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-200 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <MagneticButton onClick={scrollToWork} size="lg" className="group">
            View My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </MagneticButton>
          <MagneticButton variant="outline" size="lg">
            Download CV
          </MagneticButton>
        </div>

        <div className="animate-fade-in-up animate-delay-300 flex items-center justify-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary hover:scale-110 transition-all duration-300 group"
            title="View GitHub Profile"
          >
            <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary hover:scale-110 transition-all duration-300 group"
            title="Connect on LinkedIn"
          >
            <Linkedin className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-primary hover:scale-110 transition-all duration-300 group"
            title="Send Email"
          >
            <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
