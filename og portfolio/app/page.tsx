"use client"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkSection } from "@/components/work-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Subtle3DCursor } from "@/components/subtle-3d-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingTextAnimation } from "@/components/floating-text-animation"
import dynamic from "next/dynamic"
const Navigation3DDots = dynamic(
  () => import("@/components/3d-navigation-dots").then((m) => m.Navigation3DDots),
  { ssr: false }
)
import { TypingIndicator } from "@/components/typing-indicator"
import { EasterEggKonami } from "@/components/easter-egg-konami"
import { InteractiveCursorTrail } from "@/components/interactive-cursor-trail"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { SmoothScrollWrapper } from "@/components/smooth-scroll-wrapper"
import { SecretEasterEgg } from "@/components/secret-easter-egg"
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <SmoothScrollWrapper>
      <main className="min-h-screen relative">
        <ScrollProgress />
        <Subtle3DCursor />
        <Navigation3DDots />
        <TypingIndicator />
        <EasterEggKonami />
        <InteractiveCursorTrail />
        <PerformanceMonitor />
        <SecretEasterEgg />
        <FloatingElements />
        <Navigation />
        <div className="relative">
          <HeroSection />
          <FloatingTextAnimation />
        </div>
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScrollWrapper>
  )
}
