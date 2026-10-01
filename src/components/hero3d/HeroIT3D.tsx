"use client";

import {
  Component,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GreenSphereFallback } from "../GreenSphereFallback";

type SceneProps = {
  reduced: boolean;
  compact: boolean; // <900px
  minimal: boolean; // <600px
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
};

const CODE_LINES = [
  "const craft = async (idea) => {",
  "  const plan = await clarify(idea);",
  "  const system = design(plan);",
  "  return ship(polish(system));",
  "};",
  "",
  "type Stack = 'web' | 'db' | 'game';",
  "function build(scope: Stack) {",
  "  const ui = layout({ responsive: true });",
  "  const data = schema.normalize();",
  "  return deploy({ ui, data });",
  "}",
  "",
  "// ready to ship — ufaq",
];

function createCodeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  let tick = 0;
  let cursorOn = true;

  const draw = () => {
    tick += 1;
    if (tick % 8 === 0) cursorOn = !cursorOn;

    ctx.fillStyle = "#07100e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(45,212,191,0.08)";
    ctx.fillRect(0, 0, 28, canvas.height);

    ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
    const colors = ["#2dd4bf", "#a78bfa", "#e2e8f0", "#5eead4", "#c4b5fd"];
    const offset = Math.floor(tick / 40) % CODE_LINES.length;

    for (let i = 0; i < 14; i++) {
      const line = CODE_LINES[(offset + i) % CODE_LINES.length];
      ctx.fillStyle = colors[i % colors.length];
      const indent = (line.match(/^\s*/)?.[0].length ?? 0) * 7;
      ctx.fillText(line.trimStart() || " ", 40 + indent, 28 + i * 20);
    }

    if (cursorOn) {
      ctx.fillStyle = "#2dd4bf";
      ctx.fillRect(40, 28 + 13 * 20 - 12, 8, 14);
    }

    texture.needsUpdate = true;
  };

  draw();
  return { texture, draw, canvas };
}

function createGlowSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, "rgba(45,212,191,0.55)");
  g.addColorStop(0.45, "rgba(45,212,191,0.15)");
  g.addColorStop(1, "rgba(45,212,191,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Laptop({
  codeTex,
  reduced,
}: {
  codeTex: THREE.CanvasTexture;
  reduced: boolean;
}) {
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: codeTex,
        emissiveMap: codeTex,
        emissive: new THREE.Color("#2dd4bf"),
        emissiveIntensity: 0.9,
        metalness: 0.2,
        roughness: 0.4,
      }),
    [codeTex]
  );

  useEffect(() => {
    return () => {
      screenMat.dispose();
    };
  }, [screenMat]);

  return (
    <group>
      {/* Base */}
      <RoundedBox args={[2.2, 0.08, 1.5]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0d1110" metalness={0.85} roughness={0.35} />
      </RoundedBox>
      {/* Green edge strip */}
      <mesh position={[0, 0.05, 0.72]}>
        <boxGeometry args={[2.05, 0.015, 0.02]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
      {/* Keyboard deck keys (instanced) */}
      <KeyboardKeys />
      {/* Lid group ~100° */}
      <group position={[0, 0.04, -0.72]} rotation={[(-Math.PI / 180) * 100, 0, 0]}>
        <RoundedBox args={[2.2, 1.4, 0.06]} radius={0.04} smoothness={4} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#0d1110" metalness={0.85} roughness={0.35} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0.72, 0.04]} material={screenMat}>
          <planeGeometry args={[1.9, 1.15]} />
        </mesh>
        {/* Lid back U mark */}
        {!reduced && (
          <mesh position={[0, 0.72, -0.04]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.35, 0.4]} />
            <meshStandardMaterial
              color="#2dd4bf"
              emissive="#2dd4bf"
              emissiveIntensity={0.8}
              transparent
              opacity={0.55}
              toneMapped={false}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

function KeyboardKeys() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 48;

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    let i = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        if (i >= count) break;
        dummy.position.set(-0.85 + col * 0.15, 0.055, -0.15 + row * 0.16);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.11, 0.02, 0.11]} />
      <meshStandardMaterial color="#151a18" metalness={0.4} roughness={0.55} />
    </instancedMesh>
  );
}

function Database() {
  return (
    <group scale={0.35}>
      {[0, 0.35, 0.7].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.22, 24]} />
          <meshStandardMaterial color="#111816" metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
      {[0.18, 0.53].map((y) => (
        <mesh key={`r${y}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.46, 0.03, 8, 32]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Chip() {
  const pins = 16;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < pins; i++) {
      const side = i < 8 ? -1 : 1;
      const idx = i % 8;
      dummy.position.set(side * 0.42, 0, -0.28 + idx * 0.08);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group scale={0.4}>
      <RoundedBox args={[0.7, 0.1, 0.7]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color="#0f1412" metalness={0.75} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.28, 0.02, 0.28]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={1.3}
          toneMapped={false}
        />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, pins]}>
        <boxGeometry args={[0.04, 0.02, 0.06]} />
        <meshStandardMaterial color="#2a3330" metalness={0.8} roughness={0.25} />
      </instancedMesh>
    </group>
  );
}

function Cloud() {
  const positions: [number, number, number][] = [
    [0, 0, 0],
    [0.35, 0.05, 0.1],
    [-0.3, 0.02, -0.05],
    [0.15, 0.18, -0.1],
    [-0.1, 0.15, 0.15],
  ];
  return (
    <group scale={0.45}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.28 + (i % 3) * 0.04, 16, 16]} />
          <meshStandardMaterial
            color="#c8d6d2"
            metalness={0.15}
            roughness={0.35}
            transparent
            opacity={0.85}
            emissive="#2dd4bf"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodeSymbol() {
  const bar = (args: [number, number, number], pos: [number, number, number], rot = 0) => (
    <mesh position={pos} rotation={[0, 0, rot]}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        color="#2dd4bf"
        emissive="#2dd4bf"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </mesh>
  );
  return (
    <group scale={0.35}>
      {/* < */}
      {bar([0.08, 0.55, 0.08], [-0.55, 0.12, 0], 0.5)}
      {bar([0.08, 0.55, 0.08], [-0.55, -0.12, 0], -0.5)}
      {/* / */}
      {bar([0.08, 0.85, 0.08], [0, 0, 0], -0.45)}
      {/* > */}
      {bar([0.08, 0.55, 0.08], [0.55, 0.12, 0], -0.5)}
      {bar([0.08, 0.55, 0.08], [0.55, -0.12, 0], 0.5)}
    </group>
  );
}

function GitBranch() {
  return (
    <group scale={0.4}>
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <mesh position={[0.45, 0.35, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <mesh position={[0.45, -0.35, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <mesh position={[0.22, 0.18, 0]} rotation={[0, 0, -0.65]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.22, -0.18, 0]} rotation={[0, 0, 0.65]}>
        <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function DriftDots() {
  const positions = useMemo(() => {
    const arr = new Float32Array(20 * 3);
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const r = 1.5 + (i % 5) * 0.25;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = ((i % 7) - 3) * 0.2;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#2dd4bf"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function OrbitItem({
  children,
  radius,
  tilt,
  speed,
  phase,
  bob,
  scrollProgress,
  pointer,
  depthScale = 1,
}: {
  children: ReactNode;
  radius: number;
  tilt: number;
  speed: number;
  phase: number;
  bob: number;
  scrollProgress: React.MutableRefObject<number>;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  depthScale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(phase);

  useFrame((_, dt) => {
    if (!ref.current) return;
    t.current += dt * speed;
    const p = scrollProgress.current;
    const r = radius * (1 + p * 0.15);
    const x = Math.cos(t.current) * r;
    const z = Math.sin(t.current) * r;
    const y = Math.sin(t.current * bob) * 0.2;
    // apply ring tilt
    const tilted = new THREE.Vector3(x, y, z);
    tilted.applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt);
    ref.current.position.lerp(tilted, 0.15);
    ref.current.rotation.y += dt * 0.4;
    // more parallax when in front (z > 0)
    const front = Math.max(0, tilted.z / r);
    ref.current.rotation.x = pointer.current.y * 0.12 * (0.6 + front) * depthScale;
    ref.current.rotation.z = pointer.current.x * 0.1 * (0.6 + front) * depthScale;
  });

  return <group ref={ref}>{children}</group>;
}

function SceneWorld({ reduced, compact, minimal, scrollProgress, pointer }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const laptop = useRef<THREE.Group>(null);
  const entrance = useRef({ done: false });
  const code = useMemo(() => createCodeTexture(), []);
  const glowTex = useMemo(() => createGlowSprite(), []);
  const { gl } = useThree();
  const inViewRef = useRef(true);
  const time = useRef(0);

  useEffect(() => {
    const canvas = gl.domElement;
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
    return () => {
      io.disconnect();
      code.texture.dispose();
      glowTex.dispose();
    };
  }, [gl, code.texture, glowTex]);

  useEffect(() => {
    if (reduced) return;
    let id = 0;
    const loop = () => {
      if (inViewRef.current) code.draw();
      id = window.setTimeout(loop, 120);
    };
    id = window.setTimeout(loop, 120);
    return () => window.clearTimeout(id);
  }, [code, reduced]);

  // Entrance
  useEffect(() => {
    if (reduced || !laptop.current || !root.current) return;
    const lap = laptop.current;
    lap.scale.setScalar(0.6);
    lap.rotation.y = -1.2;
    lap.position.y = -0.6;
    gsap.to(lap.scale, { x: 1, y: 1, z: 1, duration: 1.1, ease: "expo.out", delay: 0.35 });
    gsap.to(lap.rotation, { y: 0, duration: 1.1, ease: "expo.out", delay: 0.35 });
    gsap.to(lap.position, {
      y: 0,
      duration: 1.1,
      ease: "expo.out",
      delay: 0.35,
      onComplete: () => {
        entrance.current.done = true;
      },
    });
  }, [reduced]);

  useFrame((_, dt) => {
    if (!root.current || !laptop.current) return;
    if (reduced) return;

    time.current += dt;
    const t = time.current;
    const p = scrollProgress.current;

    // Laptop elliptical drift + sway
    const lx = Math.cos(t * 0.35) * 0.25;
    const lz = Math.sin(t * 0.35) * 0.25;
    laptop.current.position.x = THREE.MathUtils.lerp(laptop.current.position.x, lx, 0.08);
    laptop.current.position.z = THREE.MathUtils.lerp(laptop.current.position.z, lz, 0.08);
    if (entrance.current.done) {
      laptop.current.position.y = Math.sin(t * 0.9) * 0.05;
      laptop.current.rotation.y = Math.sin(t * 0.4) * 0.5;
      laptop.current.rotation.x = 0.12 + Math.sin(t * 0.6) * 0.04;
    }

    // Whole scene float + scroll + pointer
    const targetY = Math.sin(t * 0.9) * 0.14 + p * -1.1;
    const targetScale = 1 - p * 0.18;
    const targetRotX = p * 0.35 + pointer.current.y * 0.18;
    const targetRotY = pointer.current.x * 0.18;

    root.current.position.y = THREE.MathUtils.lerp(root.current.position.y, targetY, 0.08);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetRotX, 0.08);
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetRotY, 0.08);
    const s = THREE.MathUtils.lerp(root.current.scale.x, targetScale, 0.08);
    root.current.scale.setScalar(s);
  });

  const showCloud = !compact && !minimal;
  const showChip = !compact && !minimal;
  const showGit = !minimal;
  const showCode = !minimal || compact;

  return (
    <group ref={root} scale={compact ? 0.85 : 1}>
      <sprite scale={[6, 6, 1]} position={[0, 0.2, -1.5]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <ambientLight intensity={0.25} />
      <directionalLight position={[-3, 4, 2]} intensity={0.85} color="#d8fff6" />
      <directionalLight position={[4, 1, -2]} intensity={0.35} color="#a78bfa" />
      <pointLight position={[0, 0.8, 1.6]} intensity={1.2} color="#2dd4bf" distance={6} />

      <group ref={laptop}>
        <Laptop codeTex={code.texture} reduced={reduced} />
      </group>

      {!minimal && (
        <OrbitItem
          radius={2.0}
          tilt={0.35}
          speed={0.22}
          phase={0}
          bob={1.3}
          scrollProgress={scrollProgress}
          pointer={pointer}
        >
          <Database />
        </OrbitItem>
      )}

      {showChip && (
        <OrbitItem
          radius={2.6}
          tilt={-0.26}
          speed={0.18}
          phase={1.2}
          bob={1.7}
          scrollProgress={scrollProgress}
          pointer={pointer}
        >
          <Chip />
        </OrbitItem>
      )}

      {showCloud && (
        <OrbitItem
          radius={2.0}
          tilt={0.35}
          speed={0.26}
          phase={2.4}
          bob={1.1}
          scrollProgress={scrollProgress}
          pointer={pointer}
        >
          <Cloud />
        </OrbitItem>
      )}

      {showCode && (
        <OrbitItem
          radius={2.6}
          tilt={-0.26}
          speed={0.3}
          phase={3.5}
          bob={1.5}
          scrollProgress={scrollProgress}
          pointer={pointer}
          depthScale={1.15}
        >
          <CodeSymbol />
        </OrbitItem>
      )}

      {showGit && (
        <OrbitItem
          radius={2.3}
          tilt={0.1}
          speed={0.2}
          phase={4.6}
          bob={1.4}
          scrollProgress={scrollProgress}
          pointer={pointer}
        >
          <GitBranch />
        </OrbitItem>
      )}

      {!compact && !reduced && <DriftDots />}
    </group>
  );
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { err: boolean }
> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) return this.props.fallback;
    return this.props.children;
  }
}

function useWebGL() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      setOk(!!gl);
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

export default function HeroIT3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(true); // hide until we know viewport (≥900px)
  const [minimal, setMinimal] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const webgl = useWebGL();

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCompact = window.matchMedia("(max-width: 899px)");
    const mqMinimal = window.matchMedia("(max-width: 599px)");
    const sync = () => {
      setReduced(mqReduce.matches);
      setCompact(mqCompact.matches);
      setMinimal(mqMinimal.matches);
    };
    sync();
    mqReduce.addEventListener("change", sync);
    mqCompact.addEventListener("change", sync);
    mqMinimal.addEventListener("change", sync);

    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    const el = wrapRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        ([e]) => setInView(e.isIntersecting),
        { threshold: 0.05 }
      );
      io.observe(el);
    }

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pointer.current.x = THREE.MathUtils.clamp((e.clientX - cx) / cx, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp((e.clientY - cy) / cy, -1, 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const st = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        if (wrapRef.current) {
          wrapRef.current.style.opacity = String(1 - self.progress * 0.35);
        }
      },
    });

    return () => {
      mqReduce.removeEventListener("change", sync);
      mqCompact.removeEventListener("change", sync);
      mqMinimal.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      io?.disconnect();
      st.kill();
    };
  }, []);

  if (compact) {
    return null;
  }

  if (!webgl) {
    return <GreenSphereFallback />;
  }

  const running = inView && tabVisible && !reduced;

  return (
    <ErrorBoundary fallback={<GreenSphereFallback />}>
      <div
        ref={wrapRef}
        className="pointer-events-none absolute right-[2%] top-[18%] z-0 hidden aspect-square w-[min(48vw,460px)] min-[900px]:block md:right-[4%]"
        aria-hidden
      >
        <Canvas
          frameloop={reduced ? "demand" : running ? "always" : "never"}
          dpr={compact ? 1 : [1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          camera={{ fov: 35, position: [0, 0.4, 7], near: 0.1, far: 40 }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            if (reduced) gl.render;
          }}
        >
          <Suspense fallback={null}>
            <SceneWorld
              reduced={reduced}
              compact={compact}
              minimal={minimal}
              scrollProgress={scrollProgress}
              pointer={pointer}
            />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
