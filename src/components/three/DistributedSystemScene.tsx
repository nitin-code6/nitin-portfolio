'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Refined 3D Distributed Systems Pipeline framing the profile core
function DistributedPipeline() {
  const groupRef = useRef<THREE.Group>(null);
  const streamParticlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Desktop vs mobile horizontal positioning:
  // On desktop (viewport.width >= 5.0), place around x = 1.62 to tightly frame the right-hand profile card.
  // On mobile/tablet, center behind the profile card.
  const isDesktop = viewport.width >= 5.0;
  const targetX = isDesktop ? 1.62 : 0;
  const targetY = isDesktop ? 0 : -0.7;

  // Ingestion Queue Nodes (Floating cleanly along the left perimeter of the card, kept far right of hero text)
  const queueNodes = useMemo(() => [
    [-0.85, 0.65, 0.15],
    [-0.95, 0.05, -0.15],
    [-0.85, -0.65, 0.15]
  ] as [number, number, number][], []);

  // Worker Execution Nodes (Framing top and bottom outer perimeter)
  const workerNodes = useMemo(() => [
    [-0.45, 0.95, 0.1],
    [0.45, 0.95, -0.15],
    [-0.45, -0.95, -0.1],
    [0.45, -0.95, 0.15]
  ] as [number, number, number][], []);

  // Event Stream Egress Nodes (Looping along the right perimeter of the card)
  const streamNodes = useMemo(() => [
    [0.85, 0.65, -0.15],
    [0.95, 0.05, 0.2],
    [0.85, -0.65, -0.15]
  ] as [number, number, number][], []);

  // Deterministic live event particle cloud orbiting tight along the perimeter
  const particlePositions = useMemo(() => {
    const count = 36;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.15 + (((i * 17) % 15) / 100);
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * (radius * 0.85);
      positions[i * 3 + 2] = (((i * 31) % 40) / 40 - 0.5) * 0.4;
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
    <group ref={groupRef} position={[targetX, targetY, -0.2]}>
      {/* Fiber Network Connections */}
      <lineSegments geometry={networkLines}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Floating Ingestion Queue Nodes */}
      {queueNodes.map((pos, i) => (
        <Float key={`queue-${i}`} speed={2 + i * 0.4} rotationIntensity={0.2} floatIntensity={0.35}>
          <group position={pos}>
            <mesh>
              <sphereGeometry args={[0.075, 24, 24]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#0284c7"
                emissiveIntensity={0.8}
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>
            {/* Halo glow */}
            <mesh scale={[1.4, 1.4, 1.4]}>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Floating Worker Execution Nodes */}
      {workerNodes.map((pos, i) => (
        <Float key={`worker-${i}`} speed={1.8 + i * 0.3} rotationIntensity={0.25} floatIntensity={0.4}>
          <group position={pos}>
            <mesh>
              <sphereGeometry args={[0.085, 24, 24]} />
              <meshStandardMaterial
                color="#6366f1"
                emissive="#4f46e5"
                emissiveIntensity={0.9}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            {/* Halo glow */}
            <mesh scale={[1.4, 1.4, 1.4]}>
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshBasicMaterial color="#818cf8" transparent opacity={0.2} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Floating Event Stream Egress Nodes */}
      {streamNodes.map((pos, i) => (
        <Float key={`stream-${i}`} speed={2.2 + i * 0.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <group position={pos}>
            <mesh>
              <sphereGeometry args={[0.07, 24, 24]} />
              <meshStandardMaterial
                color="#22d3ee"
                emissive="#06b6d4"
                emissiveIntensity={0.85}
                roughness={0.15}
                metalness={0.9}
              />
            </mesh>
            {/* Halo glow */}
            <mesh scale={[1.4, 1.4, 1.4]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Live Stream Orbital Particle Ring */}
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
        <ringGeometry args={[1.22, 1.25, 64]} />
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

        {/* Distributed Pipeline Scene */}
        <DistributedPipeline />
      </Canvas>
    </div>
  );
}
