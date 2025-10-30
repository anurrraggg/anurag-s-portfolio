"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Text } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function InteractiveCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireframeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const hoverMultiplier = hovered ? 1.5 : 1

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2 * hoverMultiplier) * 0.1
      meshRef.current.rotation.y = time * 0.1 * hoverMultiplier
      meshRef.current.position.y = Math.sin(time * 0.3) * 0.2
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1)
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.05 * hoverMultiplier
      wireframeRef.current.rotation.z = Math.sin(time * 0.15) * 0.05
    }
  })

  const isDark = theme === "dark"
  const primaryColor = isDark ? "#ffffff" : "#1a1a1a"
  const accentColor = isDark ? "#60a5fa" : "#3b82f6"
  const secondaryColor = isDark ? "#34d399" : "#10b981"
  const tertiaryColor = isDark ? "#a78bfa" : "#8b5cf6"

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={hovered ? accentColor : primaryColor}
          transparent
          opacity={hovered ? 0.8 : 0.6}
          roughness={0.2}
          metalness={0.8}
          emissive={hovered ? accentColor : primaryColor}
          emissiveIntensity={hovered ? 0.2 : 0.1}
        />
      </mesh>

      <mesh ref={wireframeRef} position={[0, 0, 0]} scale={1.1}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={hovered ? 0.5 : 0.3} />
      </mesh>

      <Text
        position={[-2.5, 1.5, 0]}
        fontSize={0.3}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {"{ }"}
      </Text>

      <Text
        position={[2.5, -1, 0]}
        fontSize={0.25}
        color={secondaryColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {"</>"}
      </Text>

      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
      </mesh>

      <mesh position={[2, -0.5, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={secondaryColor} transparent opacity={0.7} />
      </mesh>

      <mesh position={[0, 2.5, -1]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={tertiaryColor} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export function FloatingCube() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Environment preset={isDark ? "night" : "dawn"} />
        <ambientLight intensity={isDark ? 0.2 : 0.4} />
        <pointLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 0.6} color={isDark ? "#60a5fa" : "#3b82f6"} />
        <pointLight position={[-5, -5, 5]} intensity={isDark ? 0.4 : 0.3} color={isDark ? "#a78bfa" : "#8b5cf6"} />
        <InteractiveCube />
      </Canvas>
    </div>
  )
}
