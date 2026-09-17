'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { Suspense, useMemo, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Mesh,
  SRGBColorSpace,
  TextureLoader,
} from 'three'

const FACE_IMAGES = [
  '/images/smart-campus/dashboard.png?v=10',
  '/images/shadow-warrior/combat.png',
]

function createPyramidGeometry() {
  const geo = new BufferGeometry()
  const s = 1.35
  const v = [
    [0, s, 0],
    [s, -s, s],
    [-s, -s, s],
    [0, -s, -s],
  ]

  const faces = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 1],
    [1, 3, 2],
  ]

  const positions: number[] = []
  const uvs: number[] = []
  const normals: number[] = []

  faces.forEach((face) => {
    const a = v[face[0]]
    const b = v[face[1]]
    const c = v[face[2]]
    positions.push(...a, ...b, ...c)
    uvs.push(0.5, 1, 0, 0, 1, 0)
    const ux = b[0] - a[0]
    const uy = b[1] - a[1]
    const uz = b[2] - a[2]
    const vx = c[0] - a[0]
    const vy = c[1] - a[1]
    const vz = c[2] - a[2]
    const nx = uy * vz - uz * vy
    const ny = uz * vx - ux * vz
    const nz = ux * vy - uy * vx
    const len = Math.hypot(nx, ny, nz) || 1
    const n = [nx / len, ny / len, nz / len]
    normals.push(...n, ...n, ...n)
  })

  geo.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geo.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))
  geo.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
  geo.addGroup(0, 3, 0)
  geo.addGroup(3, 3, 1)
  geo.addGroup(6, 3, 2)
  geo.addGroup(9, 3, 3)
  return geo
}

function makeCertTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (!ctx) return new CanvasTexture(canvas)
  ctx.fillStyle = '#F4F1EA'
  ctx.fillRect(0, 0, 1024, 1024)
  ctx.fillStyle = '#E8622C'
  ctx.fillRect(0, 0, 1024, 28)
  ctx.fillStyle = '#0D0D0D'
  ctx.font = '700 64px sans-serif'
  ctx.fillText('CERT SYSTEM', 80, 200)
  ctx.fillStyle = '#E8622C'
  ctx.font = '500 44px sans-serif'
  ;['Specify', 'Design', 'Build', 'Test'].forEach((label, index) => {
    ctx.fillText(`${String(index + 1).padStart(2, '0')}  ${label}`, 80, 380 + index * 130)
  })
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function TexturedPyramid({ reduce }: { reduce: boolean }) {
  const mesh = useRef<Mesh>(null)
  const photoTextures = useLoader(TextureLoader, FACE_IMAGES)
  const certTexture = useMemo(() => makeCertTexture(), [])
  const geometry = useMemo(() => createPyramidGeometry(), [])

  photoTextures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace
    texture.needsUpdate = true
  })

  useFrame((_, delta) => {
    if (!mesh.current || reduce) return
    mesh.current.rotation.y += delta * 0.07
    mesh.current.rotation.x += delta * 0.016
  })

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[0.18, 0.35, 0]}>
      <meshStandardMaterial attach="material-0" map={photoTextures[0]} roughness={0.72} />
      <meshStandardMaterial attach="material-1" map={certTexture} roughness={0.72} />
      <meshStandardMaterial attach="material-2" map={photoTextures[1]} roughness={0.72} />
      <meshStandardMaterial attach="material-3" color="#C24A1F" roughness={0.6} />
    </mesh>
  )
}

export function Hero3D() {
  const reduce = useReducedMotion() ?? false

  return (
    <div
      id="hero-3d"
      className="h-[280px] overflow-hidden rounded-[32px] border border-cream/10 bg-[#161616] shadow-[inset_0_-40px_80px_rgb(0_0_0_/_0.35)] lg:h-[420px] lg:translate-y-8"
    >
      <Canvas camera={{ position: [0, 0.28, 4.7], fov: 36 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.62} />
        <directionalLight position={[2.4, 3.2, 2.2]} intensity={0.48} color="#F4F1EA" />
        <pointLight position={[2, 1.2, 1.6]} intensity={0.28} color="#E8622C" />
        <pointLight position={[-1.8, -0.8, 1]} intensity={0.12} color="#F4F1EA" />
        <Suspense fallback={null}>
          <TexturedPyramid reduce={reduce} />
        </Suspense>
      </Canvas>
    </div>
  )
}
