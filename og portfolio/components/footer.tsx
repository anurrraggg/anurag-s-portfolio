import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-muted-foreground text-xs">© 2026 Anurag Pandey. Crafted with passion.</p>
          </div>

          <div className="flex items-center space-x-2">
            <a href="https://github.com/anurrraggg" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hover:text-primary h-8 w-8 p-0">
                <Github className="h-3.5 w-3.5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a href="https://www.instagram.com/anurrraggg/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hover:text-primary h-8 w-8 p-0">
                <Instagram className="h-3.5 w-3.5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/anurrraggg/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hover:text-primary h-8 w-8 p-0">
                <Linkedin className="h-3.5 w-3.5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
            <a href="mailto:anuragpandey945028@gmail.com">
              <Button variant="ghost" size="sm" className="hover:text-primary h-8 w-8 p-0">
                <Mail className="h-3.5 w-3.5" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
