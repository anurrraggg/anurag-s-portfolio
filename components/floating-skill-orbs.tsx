"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Text3D, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type { Mesh } from "three"

function SkillOrb({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const meshRef = useRef<Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <Text3D
        position={[position[0], position[1] - 0.6, position[2]]}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.1}
        height={0.02}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </Float>
  )
}

export function FloatingSkillOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SkillOrb position={[-2, 1, 0]} text="React" color="#61dafb" />
          <SkillOrb position={[2, -1, 0]} text="Node.js" color="#68a063" />
          <SkillOrb position={[0, 2, -1]} text="Web3" color="#f16822" />
          <SkillOrb position={[-1, -2, 1]} text="AI/ML" color="#ff6b6b" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
