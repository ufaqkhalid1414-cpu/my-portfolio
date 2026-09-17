'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { Group } from 'three'

const SKIN = '#E6D2C4'
const HAIR = '#1C1612'
const BLAZER = '#2B2B2B'
const BLOUSE = '#F4F1EA'
const PANTS = '#35353A'
const SHOE = '#141414'
const ACCENT = '#E8622C'

function Character({ reduce }: { reduce: boolean }) {
  const root = useRef<Group>(null)
  const leftArm = useRef<Group>(null)
  const rightArm = useRef<Group>(null)

  useFrame((state) => {
    if (reduce) return
    const t = state.clock.elapsedTime
    if (root.current) {
      root.current.rotation.y = 0.16 + Math.sin(t * 0.32) * 0.18
      root.current.position.y = -0.92 + Math.sin(t * 1.1) * 0.02
    }
    if (leftArm.current) {
      leftArm.current.rotation.x = -0.12 + Math.sin(t * 1.05) * 0.12
    }
    if (rightArm.current) {
      rightArm.current.rotation.x = 0.28 + Math.sin(t * 1.05 + Math.PI) * 0.08
      rightArm.current.rotation.z = -0.18
    }
  })

  return (
    <group ref={root} position={[0, -0.92, 0]} scale={1.12}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.05, 48]} />
        <meshStandardMaterial color="#141414" roughness={0.9} />
      </mesh>

      <mesh position={[-0.13, 0.14, 0.03]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 6, 12]} />
        <meshStandardMaterial color={PANTS} roughness={0.68} />
      </mesh>
      <mesh position={[0.13, 0.14, 0.03]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 6, 12]} />
        <meshStandardMaterial color={PANTS} roughness={0.68} />
      </mesh>
      <mesh position={[-0.13, -0.16, 0.1]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.3]} />
        <meshStandardMaterial color={SHOE} roughness={0.5} />
      </mesh>
      <mesh position={[0.13, -0.16, 0.1]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.3]} />
        <meshStandardMaterial color={SHOE} roughness={0.5} />
      </mesh>

      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.52, 0.58, 0.28]} />
        <meshStandardMaterial color={BLAZER} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.86, 0.145]} castShadow>
        <boxGeometry args={[0.16, 0.32, 0.03]} />
        <meshStandardMaterial color={BLOUSE} roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.92, 0.15]} castShadow>
        <boxGeometry args={[0.035, 0.08, 0.02]} />
        <meshStandardMaterial color={ACCENT} roughness={0.4} />
      </mesh>

      <group ref={leftArm} position={[-0.34, 0.96, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.38, 6, 12]} />
          <meshStandardMaterial color={BLAZER} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.34, 0.96, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <capsuleGeometry args={[0.065, 0.38, 6, 12]} />
          <meshStandardMaterial color={BLAZER} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.5, 0]} castShadow>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} />
        </mesh>
      </group>

      <mesh position={[0, 1.28, -0.04]} castShadow>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>
      <mesh position={[-0.16, 1.22, 0.02]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>
      <mesh position={[0.16, 1.22, 0.02]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>
      <mesh position={[0.02, 1.02, -0.12]} rotation={[0.35, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.08, 0.38, 6, 12]} />
        <meshStandardMaterial color={HAIR} roughness={0.75} />
      </mesh>

      <mesh position={[0, 1.26, 0.06]} castShadow>
        <sphereGeometry args={[0.185, 24, 24]} />
        <meshStandardMaterial color={SKIN} roughness={0.5} />
      </mesh>
      <mesh position={[-0.055, 1.28, 0.22]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
      <mesh position={[0.055, 1.28, 0.22]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} />
      </mesh>
    </group>
  )
}

export function Hero3D() {
  const reduce = useReducedMotion() ?? false

  return (
    <div
      id="hero-3d"
      aria-label="3D character"
      className="h-[280px] overflow-hidden rounded-[32px] border border-cream/10 bg-[#161616] shadow-[inset_0_-40px_80px_rgb(0_0_0_/_0.35)] lg:h-[420px] lg:translate-y-8"
    >
      <Canvas
        camera={{ position: [1.45, 0.62, 3.7], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <ambientLight intensity={0.58} />
        <directionalLight
          position={[2.4, 3.4, 2.4]}
          intensity={1.05}
          color="#F4F1EA"
          castShadow
        />
        <pointLight position={[2, 1.2, 1.6]} intensity={0.32} color="#E8622C" />
        <pointLight position={[-1.8, -0.4, 1]} intensity={0.14} color="#F4F1EA" />
        <Character reduce={reduce} />
      </Canvas>
    </div>
  )
}
