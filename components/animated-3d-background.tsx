"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function AnimatedSphere({
  position,
  color,
  speed,
}: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          transparent
          opacity={0.1}
        />
      </Sphere>
    </Float>
  )
}

export function Animated3DBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        <AnimatedSphere position={[-4, 2, -5]} color="#06b6d4" speed={1} />
        <AnimatedSphere position={[4, -2, -3]} color="#6366f1" speed={1.5} />
        <AnimatedSphere position={[0, 3, -8]} color="#8b5cf6" speed={0.8} />
        <AnimatedSphere position={[-2, -3, -6]} color="#06b6d4" speed={1.2} />
      </Canvas>
    </div>
  )
}
