import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ExternalLink, Github, Calendar, Users } from "lucide-react"

const projects = [
  {
    title: "CodeDuo",
    description:
      "Created a tool in CodeDuo to visualize sorting and graph algorithms step-by-step. It helped me understand DSA better and is now used by others to learn core concepts interactively.",
    tech: ["TypeScript", "React", "Next.js", "Framer Motion"],
    category: "Educational",
    status: "Live",
    timeline: "Ongoing",
    links: {
      github: "https://github.com/anurrraggg/codeduo",
      demo: "https://codeduojs.vercel.app/",
    },
  },
  {
    title: "PaperReviewTool",
    description:
      "ML model that analyzes text patterns to predict emotional states. Started as a personal project to understand my own writing patterns, evolved into a mental health tool.",
    tech: ["Python", "TensorFlow", "NLP", "Flask"],
    category: "Machine Learning",
    status: "Research",
    timeline: "4 months",
    impact: "Research paper submitted",
    links: {
      github: "https://github.com/anurrraggg/PaperReviewTool",
    },
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-balance">Things I've built</h2>
            <div className="w-16 h-0.5 bg-primary rounded-full" />
            <p className="text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              Here are some that I'm particularly proud of.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs transition-colors duration-300 ${project.status === "Live"
                          ? "border-green-500/50 text-green-600 dark:text-green-400"
                          : project.status === "In Progress"
                            ? "border-blue-500/50 text-blue-600 dark:text-blue-400"
                            : "border-orange-500/50 text-orange-600 dark:text-orange-400"
                          }`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm text-pretty leading-relaxed">{project.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{project.timeline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{project.impact}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2">
                    {project.links.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subtle border animation */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <a href="https://github.com/anurrraggg" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 group hover:border-primary/50 transition-all duration-300">
                <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
                View more on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 
