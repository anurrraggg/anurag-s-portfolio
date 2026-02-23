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

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                My journey into computer science started with a simple realization: the best technology feels invisible. That curiosity sparked countless nights debugging neural networks, diving deep into algorithm optimization, and exploring how blockchain might actually change the way we trust each other online.
              </p>

              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                I'm pursuing my CS degree while working on projects that genuinely excite me. Whether I'm crafting efficient data structures, training models to spot hidden patterns, or building decentralized apps, I love tackling problems that need both technical skill and creative problem solving.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed pt-0 md:pt-0">
                When I'm not coding, you'll find me diving into research papers over coffee, contributing to open source, or getting into those deep conversations about where tech is heading. I've learned that the best solutions usually come from bouncing ideas off people who see things differently.
              </p>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
                <h4 className="font-semibold text-primary">Current Focus</h4>
                <p className="text-sm text-muted-foreground">
                  Deepening my understanding of Large Language Model internals and exploring zero-knowledge proofs in blockchain privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
