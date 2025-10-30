"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Text } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

const codeLines = [
  "function solve(problem) {",
  "  const solution = think();",
  "  return optimize(solution);",
  "}",
  "",
  "while (learning) {",
  "  code();",
  "  debug();",
  "  improve();",
  "}",
]

function CodeBlock() {
  const groupRef = useRef<THREE.Group>(null)
  const [currentLine, setCurrentLine] = useState(0)
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.1
      if (hovered) {
        groupRef.current.scale.setScalar(1.05)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const isDark = theme === "dark"
  const primaryColor = isDark ? "#e2e8f0" : "#1e293b"
  const accentColor = isDark ? "#60a5fa" : "#3b82f6"
  const keywordColor = isDark ? "#f472b6" : "#ec4899"
  const stringColor = isDark ? "#34d399" : "#10b981"

  return (
    <group ref={groupRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Terminal background */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial
          color={isDark ? "#0f172a" : "#f8fafc"}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Terminal border */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[4.1, 3.1]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.3} wireframe />
      </mesh>

      {/* Code lines */}
      {codeLines.map((line, index) => (
        <Text
          key={index}
          position={[-1.8, 1.2 - index * 0.25, 0]}
          fontSize={0.12}
          color={index === currentLine ? accentColor : primaryColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/GeistMono-Regular.ttf"
          transparent
          opacity={index === currentLine ? 1 : 0.6}
        >
          {line}
        </Text>
      ))}

      {/* Cursor */}
      <mesh position={[1.8, 1.2 - currentLine * 0.25, 0.01]}>
        <planeGeometry args={[0.02, 0.15]} />
        <meshBasicMaterial color={accentColor} transparent opacity={Math.sin(Date.now() * 0.005) * 0.5 + 0.5} />
      </mesh>

      {/* Floating elements */}
      <mesh position={[-2.5, 1.8, 0.5]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={keywordColor} transparent opacity={0.7} />
      </mesh>

      <mesh position={[2.2, -1.2, 0.3]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={stringColor} transparent opacity={0.6} />
      </mesh>

      <mesh position={[0, 2, -0.5]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
      </mesh>

      {/* Brackets decoration */}
      <Text
        position={[-2.2, -1.5, 0]}
        fontSize={0.2}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
        transparent
        opacity={0.4}
      >
        {"{ }"}
      </Text>

      <Text
        position={[2.2, 1.5, 0]}
        fontSize={0.15}
        color={keywordColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
        transparent
        opacity={0.4}
      >
        {"</>"}
      </Text>
    </group>
  )
}

export function CodeVisualization() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Environment preset={isDark ? "night" : "dawn"} />
        <ambientLight intensity={isDark ? 0.3 : 0.6} />
        <pointLight position={[3, 3, 3]} intensity={isDark ? 0.6 : 0.4} color={isDark ? "#60a5fa" : "#3b82f6"} />
        <pointLight position={[-3, -3, 3]} intensity={isDark ? 0.3 : 0.2} color={isDark ? "#f472b6" : "#ec4899"} />
        <CodeBlock />
      </Canvas>
    </div>
  )
}
