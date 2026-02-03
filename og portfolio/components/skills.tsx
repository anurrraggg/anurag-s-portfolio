import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [

  {
    title: "Machine Learning",
    description: "Teaching machines to see patterns I can't",
    skills: ["Neural Networks", "Computer Vision", "NLP", "TensorFlow", "PyTorch", "Scikit-learn"],
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    story: "From linear regression to transformers - still amazed by what's possible",
  },
  {
    title: "Blockchain & Web3",
    description: "Exploring decentralized futures",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "DeFi", "Web3.js", "Hardhat"],
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    story: "Fascinated by trustless systems and programmable money",
  },
  {
    title: "Development Tools",
    description: "The languages and tools I think in",
    skills: ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Git"],
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    story: "Each language teaches you a different way to solve problems",
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-balance">What I work with</h2>
            <div className="w-16 h-0.5 bg-primary rounded-full" />
            <p className="text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              These are the tools and technologies I've grown comfortable with through projects, coursework, and
              countless hours of experimentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="glass-card p-6 space-y-4 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-primary">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <p className="text-xs italic">{category.story}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className={category.color}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
