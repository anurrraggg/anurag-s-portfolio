"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function InteractiveSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere
        ref={meshRef}
        args={[0.1, 16, 16]}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? "#6366f1" : "#00d4ff"} transparent opacity={0.6} wireframe />
      </Sphere>
    </Float>
  )
}

export function Micro3DInteractions() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <InteractiveSphere position={[-3, 2, 0]} />
        <InteractiveSphere position={[3, -2, 0]} />
        <InteractiveSphere position={[0, 0, -2]} />
        <InteractiveSphere position={[-2, -1, 1]} />
        <InteractiveSphere position={[2, 1, -1]} />
      </Canvas>
    </div>
  )
}
