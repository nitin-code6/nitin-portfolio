'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Refined 3D Distributed Systems Pipeline framing the profile core
function DistributedPipeline() {
  const groupRef = useRef<THREE.Group>(null);
  const streamParticlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Ingestion Queue Nodes (Floating gracefully to the left of the card)
  const queueNodes = useMemo(() => [
    [-1.25, 0.75, 0.15],
    [-1.45, 0.05, -0.2],
    [-1.2, -0.65, 0.15]
  ] as [number, number, number][], []);

  // Worker Execution Nodes (Framing top and bottom outer perimeter)
  const workerNodes = useMemo(() => [
    [-0.55, 1.15, 0.1],
    [0.55, 1.15, -0.15],
    [-0.55, -1.15, -0.1],
    [0.55, -1.15, 0.15]
  ] as [number, number, number][], []);

  // Event Stream Egress Nodes (Looping to the right of the card)
  const streamNodes = useMemo(() => [
    [1.25, 0.75, -0.15],
    [1.45, 0.05, 0.2],
    [1.2, -0.65, -0.15]
  ] as [number, number, number][], []);

  // Deterministic live event particle cloud orbiting along the perimeter
  const particlePositions = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.35 + (((i * 17) % 20) / 100);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * (radius * 0.85);
      positions[i * 3 + 2] = (((i * 31) % 40) / 40 - 0.5) * 0.5;
    }
    return positions;
  }, []);

  // Fiber-optic style network interconnects framing the profile
  const networkLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    
    // Connect Queue to Top/Bottom Workers
    queueNodes.forEach((qp) => {
      workerNodes.forEach((wp) => {
        pts.push(new THREE.Vector3(qp[0], qp[1], qp[2]));
        pts.push(new THREE.Vector3(wp[0], wp[1], wp[2]));
      });
    });

    // Connect Workers to Stream Egress
    workerNodes.forEach((wp) => {
      streamNodes.forEach((sp) => {
        pts.push(new THREE.Vector3(wp[0], wp[1], wp[2]));
        pts.push(new THREE.Vector3(sp[0], sp[1], sp[2]));
      });
    });

    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [queueNodes, workerNodes, streamNodes]);

  // Gentle Mouse Parallax & Dynamic Flow Animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.18;
      const mouseY = state.pointer.y * 0.14;
      
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouseX + Math.sin(state.clock.elapsedTime * 0.2) * 0.06,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouseY + Math.cos(state.clock.elapsedTime * 0.18) * 0.05,
        2.5,
        delta
      );
    }

    // Slowly rotate orbital data ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }

    // Orbit data stream particles
    if (streamParticlesRef.current) {
      streamParticlesRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Pathways with subtle fiber glow */}
      <lineSegments geometry={networkLines}>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.11} depthWrite={false} />
      </lineSegments>

      {/* Floating Ingestion Queue Nodes (Glowing Cyan Spheres) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.25}>
        {queueNodes.map((pos, i) => (
          <mesh key={`q-${i}`} position={pos}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.0}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </Float>

      {/* Worker Sandboxes (Crystalline Octahedrons framing the card) */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.3}>
        {workerNodes.map((pos, i) => (
          <group key={`w-${i}`} position={pos}>
            <mesh>
              <octahedronGeometry args={[0.11, 0]} />
              <meshStandardMaterial
                color="#818cf8"
                emissive="#6366f1"
                emissiveIntensity={1.1}
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.14, 0]} />
              <meshBasicMaterial
                color="#a5b4fc"
                wireframe
                transparent
                opacity={0.25}
              />
            </mesh>
          </group>
        ))}
      </Float>

      {/* Stream Egress Nodes (Emerald / Cyan Relays) */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.25}>
        {streamNodes.map((pos, i) => (
          <mesh key={`s-${i}`} position={pos}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#059669"
              emissiveIntensity={1.1}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </Float>

      {/* Orbiting Live Data Stream Particles */}
      <points ref={streamParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Outer Orbital Frame Ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.45, 1.48, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function DistributedSystemScene() {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none',
        overflow: 'hidden' 
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 4]} intensity={1.0} color="#ffffff" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[3, 2, 2]} intensity={0.9} color="#818cf8" />
        <fog attach="fog" args={['#050814', 3.0, 6.5]} />

        {/* Coordinated with the right-hand profile card */}
        <group position={[1.35, 0, -0.15]}>
          <DistributedPipeline />
        </group>
      </Canvas>
    </div>
  );
}
