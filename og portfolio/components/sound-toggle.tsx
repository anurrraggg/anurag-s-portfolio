"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SoundToggle() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const AnyWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext }
      const Ctor = window.AudioContext || AnyWindow.webkitAudioContext
      if (Ctor) {
        audioContextRef.current = new Ctor()
      }
    }
  }, [])

  const playClickSound = () => {
    if (!isSoundEnabled || !audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.1)
  }

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled)
    if (!isSoundEnabled) playClickSound()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className="hover:text-primary transition-colors"
      title={isSoundEnabled ? "Disable sounds" : "Enable sounds"}
    >
      {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  )
}
