"use client"

import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function DepthLayer({ z, opacity, color }: { z: number; opacity: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, z]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  )
}

export function DepthLayers3D() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <DepthLayer z={-3} opacity={0.05} color="#00d4ff" />
        <DepthLayer z={-2} opacity={0.03} color="#6366f1" />
        <DepthLayer z={-1} opacity={0.02} color="#00d4ff" />
      </Canvas>
    </div>
  )
}
