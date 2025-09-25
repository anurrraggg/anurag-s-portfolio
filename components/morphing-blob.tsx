"use client"

import { Canvas } from "@react-three/fiber"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function MorphingShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.rotation.y = time * 0.1
      meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.05} wireframe={false} />
    </mesh>
  )
}

export function MorphingBlob({ className }: { className?: string }) {
  return (
    <div className={`w-32 h-32 ${className}`}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
          <ambientLight intensity={0.5} />
          <MorphingShape />
        </Canvas>
      </Suspense>
    </div>
  )
}
