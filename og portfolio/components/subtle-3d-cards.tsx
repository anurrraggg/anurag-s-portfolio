"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Text3D, Center } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function FloatingCard({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial color={color} transparent opacity={0.1} />
        <Center>
          <Text3D font="/fonts/Geist_Regular.json" size={0.08} height={0.01} position={[0, 0, 0.03]}>
            {text}
            <meshStandardMaterial color={color} />
          </Text3D>
        </Center>
      </mesh>
    </Float>
  )
}

export function Subtle3DCards() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingCard position={[-2, 1, 0]} text="React" color="#00d4ff" />
        <FloatingCard position={[2, -1, 0]} text="Next.js" color="#6366f1" />
        <FloatingCard position={[0, 2, -1]} text="TypeScript" color="#00d4ff" />
      </Canvas>
    </div>
  )
}
