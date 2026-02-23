"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 55

export function SceneBackground() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        // ── theme helpers ─────────────────────────────────────────────
        const isDark = () => document.documentElement.classList.contains("dark")
        const fgColor = () => (isDark() ? 0xd4d4d4 : 0x2d2d2d)
        const fgOpacity = () => (isDark() ? 0.28 : 0.18)

        // ── renderer ──────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        // ── scene / camera ────────────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            55,
            mount.clientWidth / mount.clientHeight,
            0.1,
            100
        )
        camera.position.z = 9

        // ── particle data ─────────────────────────────────────────────
        // Each particle has a stable origin + phase offsets for organic drift
        const origins: { x: number; y: number; z: number }[] = []
        const phases: { x: number; y: number; speed: number; radius: number }[] = []

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            origins.push({
                x: (Math.random() - 0.5) * 18,
                y: (Math.random() - 0.5) * 10,
                z: (Math.random() - 0.5) * 3,
            })
            phases.push({
                x: Math.random() * Math.PI * 2,
                y: Math.random() * Math.PI * 2,
                speed: 0.18 + Math.random() * 0.22,  // each particle moves at its own pace
                radius: 0.25 + Math.random() * 0.5,   // orbit radius
            })
        }

        // ── geometry + material ───────────────────────────────────────
        const geo = new THREE.BufferGeometry()
        const posArr = new Float32Array(PARTICLE_COUNT * 3)
        geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3))

        // Vary sizes slightly with depth
        const sizes = new Float32Array(PARTICLE_COUNT)
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            sizes[i] = 0.04 + Math.random() * 0.04
        }
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

        const mat = new THREE.PointsMaterial({
            color: fgColor(),
            size: 0.05,
            transparent: true,
            opacity: fgOpacity(),
            sizeAttenuation: true,
            depthWrite: false,
        })

        const points = new THREE.Points(geo, mat)
        scene.add(points)

        // ── resize handler ────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener("resize", onResize, { passive: true })

        // ── theme observer ────────────────────────────────────────────
        const observer = new MutationObserver(() => {
            mat.color.set(fgColor())
            mat.opacity = fgOpacity()
        })
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        // ── animation loop ────────────────────────────────────────────
        let rafId: number
        const posAttr = geo.attributes.position as THREE.BufferAttribute

        const animate = (time: number) => {
            rafId = requestAnimationFrame(animate)

            const t = time * 0.001 // seconds

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = phases[i]
                const o = origins[i]

                // Lissajous-like smooth orbit around stable origin
                const x = o.x + Math.sin(t * p.speed + p.x) * p.radius
                const y = o.y + Math.cos(t * p.speed * 0.7 + p.y) * p.radius * 0.6
                const z = o.z

                posAttr.setXYZ(i, x, y, z)
            }
            posAttr.needsUpdate = true

            // Very slow whole-field rotation for extra depth
            points.rotation.z = t * 0.008

            renderer.render(scene, camera)
        }

        rafId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafId)
            observer.disconnect()
            window.removeEventListener("resize", onResize)
            geo.dispose()
            mat.dispose()
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            aria-hidden
            style={{
                position: "absolute",
                inset: 0,
                zIndex: -1,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        />
    )
}
