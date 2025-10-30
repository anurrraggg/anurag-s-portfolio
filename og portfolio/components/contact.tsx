import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Github, Linkedin, Coffee } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-balance">Let's Connect</h2>
            <div className="w-16 h-0.5 bg-primary rounded-full" />
            <p className="text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              I'm always down for those conversations that start with "what if we could..." and end up lasting way longer than planned. Whether you're working on something cool, want to debate where AI is really headed, or just need someone who gets genuinely excited about a clever piece of code I'd love to connect. Some of my best ideas have come from random conversations with people who think differently than I do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">Reach out</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>anuragpandey945028@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Lucknow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-primary" />
                    <span>Always up for coffee chats</span>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary">Find me online</h3>
                <div className="flex gap-4">
                  <a href="https://github.com/anurrraggg" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/anurrraggg/" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="mailto:anuragpandey@gmail.com">
                    <Button variant="ghost" size="icon" className="hover:text-primary">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">I try to respond to messages within 24 hours</p>
              </Card>

            </div>

            <Card className="glass-card p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Send me a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Your name" />
                    <Input placeholder="Your email" type="email" />
                  </div>
                  <Input placeholder="What's this about?" />
                  <Textarea placeholder="Tell me more..." rows={4} />
                  <Button type="submit" className="w-full hover:bg-primary hover:text-primary-foreground">
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
