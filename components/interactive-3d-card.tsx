"use client"

import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function InteractiveBox({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      const targetScale = isHovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={isHovered ? "#06b6d4" : "#6366f1"} wireframe transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

function CardScene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <InteractiveBox isHovered={isHovered} />
    </>
  )
}

interface Interactive3DCardProps {
  title: string
  description: string
  className?: string
}

export function Interactive3DCard({ title, description, className = "" }: Interactive3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative h-64 rounded-lg border bg-card/50 backdrop-blur-sm overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-muted/20" />}>
          <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
            <CardScene isHovered={isHovered} />
          </Canvas>
        </Suspense>
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col justify-end bg-gradient-to-t from-background/80 to-transparent">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
