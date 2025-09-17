import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { HolographicCard } from "./holographic-card"

export function WorkSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with seamless user experience and robust backend.",
      image: "/modern-ecommerce-interface.png",
      tags: ["React", "Node.js", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and intuitive design.",
      image: "/clean-task-management-dashboard.jpg",
      tags: ["Next.js", "TypeScript", "Supabase"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      description: "A minimalist portfolio showcasing creative work with smooth animations.",
      image: "/minimalist-portfolio-website.png",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather application with detailed forecasts and location-based data.",
      image: "/modern-weather-app.png",
      tags: ["Vue.js", "API Integration", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  return (
    <section id="work" className="py-20 px-6 bg-muted/30 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-400/25 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/15 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-2/3 w-1.5 h-1.5 bg-emerald-400/15 rounded-full animate-ping delay-300"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            A selection of projects that showcase my skills in development and design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <HolographicCard key={index} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm h-full">
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 relative">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse shadow-lg shadow-primary/20"></div>

                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary/20 text-foreground text-xs rounded-full border border-primary/30 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent hover:bg-primary/5 border-primary/20"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-primary/5">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
