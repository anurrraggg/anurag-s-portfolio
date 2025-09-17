"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Float } from "@react-three/drei"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function RotatingAvatar() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text3D
          font="/fonts/Geist_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-1.2, 0, 0]}
        >
          DEV
          <meshStandardMaterial color="#06b6d4" />
        </Text3D>
      </Float>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, -1]}>
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.6} />
        </mesh>
      </Float>
    </group>
  )
}

function AvatarScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <RotatingAvatar />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export function Rotating3DAvatar() {
  return (
    <div className="w-full h-full">
      <Suspense
        fallback={
          <div className="w-full h-full bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Loading 3D...</div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <AvatarScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
