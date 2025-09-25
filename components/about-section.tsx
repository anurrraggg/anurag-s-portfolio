import { Card } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"
import { Rotating3DAvatar } from "./rotating-3d-avatar"
import { Animated3DBackground } from "./animated-3d-background"
import { TextRevealAnimation } from "./text-reveal-animation"

export function AboutSection() {
  const skills = [
    {
      icon: Code,
      title: "Development",
      description: "Full-stack development with modern frameworks and technologies",
    },
    {
      icon: Palette,
      title: "Design",
      description: "User-centered design with attention to detail and aesthetics",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized solutions that are fast, scalable, and maintainable",
    },
  ]

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      <Animated3DBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <TextRevealAnimation text="About Me" className="text-3xl md:text-4xl font-bold mb-4" />
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            I&#39;m a passionate developer who loves creating digital experiences that are both beautiful and functional.
            With a keen eye for design and a love for clean code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <TextRevealAnimation text="My Journey" className="text-2xl font-semibold mb-4" delay={200} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Started as a curious developer exploring the intersection of design and technology. Over the years, I&#39;ve
              honed my skills in creating seamless user experiences and robust applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I believe in the power of minimalism and clean design to create impactful digital solutions that users
              love to interact with.
            </p>
          </div>

          <div className="relative h-80">
            <Rotating3DAvatar />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border border-primary/10 hover:border-primary/30 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <skill.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{skill.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
