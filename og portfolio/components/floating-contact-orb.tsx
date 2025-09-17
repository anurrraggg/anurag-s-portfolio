"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Html } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function ContactOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere
        ref={meshRef}
        args={[1.2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#06b6d4" : "#6366f1"}
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>

      <Html center>
        <div className="text-white text-center pointer-events-none">
          <div className="text-sm font-semibold">Let&#39;s Talk</div>
        </div>
      </Html>
    </Float>
  )
}

function OrbScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <ContactOrb />
    </>
  )
}

export function FloatingContactOrb() {
  return (
    <div className="w-full h-64">
      <Suspense
        fallback={
          <div className="w-full h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <OrbScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
