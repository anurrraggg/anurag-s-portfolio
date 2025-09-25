"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.01
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#70c0ff" transparent opacity={0.8} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Floating code symbols */}
      <Text3D font="/fonts/Geist_Bold.json" size={0.3} height={0.05} position={[-3, 1, 0]}>
        {"{ }"}
        <meshStandardMaterial color="#a855f7" />
      </Text3D>

      <Text3D font="/fonts/Geist_Bold.json" size={0.25} height={0.05} position={[2.5, -1, 0]}>
        {"< />"}
        <meshStandardMaterial color="#06b6d4" />
      </Text3D>

      <Text3D font="/fonts/GeistMono_Regular.json" size={0.2} height={0.05} position={[0, 2.5, 0]}>
        {"AI"}
        <meshStandardMaterial color="#10b981" />
      </Text3D>
    </group>
  )
}

export function InteractiveCube() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
