"use client"

import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function BackgroundCylinder() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[2, 3, 2]}>
      <cylinderGeometry args={[1, 1.2, 4, 32]} />
      <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.08} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.2} />
      <BackgroundCylinder />
      <Environment preset="dawn" />
    </>
  )
}

export function Floating3DScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
