"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only run on non-touch devices
        if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        // Hide the default cursor globally
        document.documentElement.style.cursor = "none"

        let mouseX = -100
        let mouseY = -100
        let ringX = -100
        let ringY = -100
        let isHovering = false
        let rafId: number

        // Directly position dot — no lag
        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
        }

        const onEnterInteractive = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target?.closest?.("a, button, [role='button'], input, textarea, select, label, .interactive")) {
                isHovering = true
                ring.style.width = "44px"
                ring.style.height = "44px"
                ring.style.opacity = "0.6"
                dot.style.opacity = "0"
            }
        }

        const onLeaveInteractive = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target?.closest?.("a, button, [role='button'], input, textarea, select, label, .interactive")) {
                isHovering = false
                ring.style.width = "28px"
                ring.style.height = "28px"
                ring.style.opacity = "0.5"
                dot.style.opacity = "1"
            }
        }

        const onMouseDown = () => {
            dot.style.transform = dot.style.transform + " scale(0.7)"
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(0.85)`
        }

        const onMouseUp = () => {
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
        }

        // Spring-eased ring follows the dot
        const animate = () => {
            const ease = 0.12
            ringX += (mouseX - ringX) * ease
            ringY += (mouseY - ringY) * ease
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
            rafId = requestAnimationFrame(animate)
        }

        document.addEventListener("mousemove", onMove, { passive: true })
        document.addEventListener("mouseover", onEnterInteractive, { passive: true })
        document.addEventListener("mouseout", onLeaveInteractive, { passive: true })
        document.addEventListener("mousedown", onMouseDown, { passive: true })
        document.addEventListener("mouseup", onMouseUp, { passive: true })

        rafId = requestAnimationFrame(animate)

        return () => {
            document.documentElement.style.cursor = ""
            document.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseover", onEnterInteractive)
            document.removeEventListener("mouseout", onLeaveInteractive)
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mouseup", onMouseUp)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            {/* Sharp center dot */}
            <div
                ref={dotRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--foreground)",
                    zIndex: 9999,
                    pointerEvents: "none",
                    transition: "opacity 0.2s ease",
                    willChange: "transform",
                }}
            />

            {/* Lagging ring */}
            <div
                ref={ringRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1.5px solid var(--foreground)",
                    opacity: 0.5,
                    zIndex: 9998,
                    pointerEvents: "none",
                    transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
                    willChange: "transform",
                }}
            />
        </>
    )
}
