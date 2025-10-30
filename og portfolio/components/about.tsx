import { Card } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-balance">A bit about me</h2>
            <div className="w-16 h-0.5 bg-primary rounded-full animate-gentle-pulse" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                My journey into computer science started with a simple realization: the best technology feels invisible. That curiosity sparked countless late nights debugging neural networks until they finally clicked, diving deep into algorithm optimization, and exploring how blockchain might actually change the way we trust each other online. Every bug fixed and every breakthrough feels like a small step toward building tech that just works for people.
              </p>

              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                I'm pursuing my CS degree while working on projects that genuinely excite me. Whether I'm crafting efficient data structures, training models to spot hidden patterns, or building decentralized apps, I love tackling problems that need both technical skill and creative problem solving.
              </p>

              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
               When I'm not coding, you'll find me diving into research papers over coffee, contributing to open source projects that caught my attention, or getting into those deep conversations about where tech is heading. I've learned that the best solutions usually come from bouncing ideas off people who see things differently than I do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
