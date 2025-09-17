"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Plane, shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import * as THREE from "three"

const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      float wave = sin(uv.x * 10.0 + time * 2.0) * 0.1;
      float gradient = uv.y + wave;
      
      vec3 finalColor = mix(color, vec3(0.0, 0.8, 1.0), gradient);
      float alpha = 0.3 + sin(time + uv.x * 5.0) * 0.1;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
)

extend({ HolographicMaterial })

type HolographicMaterialImpl = THREE.ShaderMaterial & { time: number }

function HolographicPlane() {
  const materialRef = useRef<HolographicMaterialImpl | null>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime
    }
  })

  return (
    <Plane args={[2, 1]} rotation={[0, 0, 0]}>
      <holographicMaterial ref={materialRef} transparent />
    </Plane>
  )
}

export function HolographicCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas>
            <HolographicPlane />
          </Canvas>
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
