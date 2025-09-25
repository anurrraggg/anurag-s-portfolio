"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, Coffee, Code, Zap } from "lucide-react"
import { TextRevealAnimation } from "./text-reveal-animation"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isHovered, setIsHovered] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for work</span>
          </div>

          <TextRevealAnimation
            text="Let's create something"
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          />
          <TextRevealAnimation
            text="amazing together"
            className="text-xl text-muted-foreground font-light"
            delay={300}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Coffee, label: "Passion", text: "Building with purpose", color: "primary" },
            { icon: Code, label: "Focus", text: "Full-stack excellence", color: "cyan-500" },
            { icon: Zap, label: "Innovation", text: "Blockchain & AI", color: "yellow-500" },
          ].map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border/50 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-all duration-300 group-hover:rotate-12`}
                >
                  <item.icon className={`w-4 h-4 text-${item.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
              <div className="font-medium group-hover:text-primary transition-colors">{item.text}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`border-0 border-b border-border/50 rounded-none bg-transparent focus:border-primary transition-all duration-300 px-0 py-3 ${
                    focusedField === "name" ? "scale-105" : ""
                  }`}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`border-0 border-b border-border/50 rounded-none bg-transparent focus:border-primary transition-all duration-300 px-0 py-3 ${
                    focusedField === "email" ? "scale-105" : ""
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Message</label>
              <Textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`border-0 border-b border-border/50 rounded-none bg-transparent focus:border-primary transition-all duration-300 px-0 py-3 resize-none ${
                  focusedField === "message" ? "scale-105" : ""
                }`}
                required
              />
            </div>

            <div className="pt-8">
              <Button
                type="submit"
                className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <div
                    className={`transition-transform duration-300 ${isHovered ? "translate-x-1 -translate-y-1" : ""}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </span>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 ${isHovered ? "scale-100" : "scale-0"}`}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
