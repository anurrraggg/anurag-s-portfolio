"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import type { Mesh } from "three"

function NavigationDot({
  position,
  isActive,
  onClick,
}: {
  position: [number, number, number]
  isActive: boolean
  onClick: () => void
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(isActive ? 1.2 : hovered ? 1.1 : 1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[0.1]} />
      <meshStandardMaterial
        color={isActive ? "#60a5fa" : "#94a3b8"}
        transparent
        opacity={0.8}
        emissive={isActive ? "#1e40af" : "#000000"}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export function Navigation3DDots() {
  const [activeSection, setActiveSection] = useState(0)
  const sections = ["Hero", "About", "Work", "Contact"]

  const scrollToSection = (index: number) => {
    setActiveSection(index)
    const sectionIds = ["hero", "about", "work", "contact"]
    const element = document.getElementById(sectionIds[index])
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 w-16 h-64 z-50">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} />
          {sections.map((_, index) => (
            <NavigationDot
              key={index}
              position={[0, 1.5 - index * 1, 0]}
              isActive={activeSection === index}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
