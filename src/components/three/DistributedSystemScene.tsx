'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Refined 3D Distributed Systems Architecture Visualization
function DistributedPipeline() {
  const groupRef = useRef<THREE.Group>(null);
  const streamParticlesRef = useRef<THREE.Points>(null);

  // Ingestion Queue Nodes (Left side of pipeline)
  const queueNodes = useMemo(() => [
    [-0.9, 0.7, 0.1],
    [-1.2, 0.2, -0.3],
    [-0.8, -0.4, 0.3],
    [-1.1, -0.8, -0.1]
  ] as [number, number, number][], []);

  // Parallel Worker Pool (Central execution nodes with crystalline octahedrons)
  const workerNodes = useMemo(() => [
    [0.2, 0.8, -0.2],
    [0.1, 0.2, 0.3],
    [0.3, -0.4, -0.3],
    [0.1, -0.9, 0.2]
  ] as [number, number, number][], []);

  // Event Stream Nodes (Right side Kafka / SSE egress)
  const streamNodes = useMemo(() => [
    [1.3, 0.9, 0.2],
    [1.5, 0.4, -0.2],
    [1.6, -0.2, 0.3],
    [1.4, -0.8, -0.1]
  ] as [number, number, number][], []);

  // Dynamic Event Stream Particle Cloud (deterministic pure generation)
  const [particlePositions, particleCount] = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic spread along pipeline path
      const pseudoX = ((i * 13) % 45) / 45;
      const pseudoY = (((i * 29) % 45) / 45) - 0.5;
      const pseudoZ = (((i * 37) % 45) / 45) - 0.5;
      positions[i * 3] = -1.4 + (pseudoX * 3.2);
      positions[i * 3 + 1] = pseudoY * 2.0;
      positions[i * 3 + 2] = pseudoZ * 0.8;
    }
    return [positions, count];
  }, []);

  // Interconnected Network Data Lines (Fiber-optic style connections)
  const networkLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    
    // Connect Ingestion to Workers
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

  // Subtle Mouse Parallax & Gentle Idle Animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.2;
      const mouseY = state.pointer.y * 0.15;
      
      // Smooth dampened rotation
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouseX + Math.sin(state.clock.elapsedTime * 0.25) * 0.08,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouseY + Math.cos(state.clock.elapsedTime * 0.2) * 0.06,
        2.5,
        delta
      );
    }

    // Animate data stream particles drifting along X axis
    if (streamParticlesRef.current) {
      const posAttr = streamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let x = posAttr.getX(i);
        x += delta * 0.6; // Stream forward
        if (x > 1.9) x = -1.4; // Loop back to ingestion
        posAttr.setX(i, x);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Pathways with subtle fiber glow */}
      <lineSegments geometry={networkLines}>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>

      {/* Floating Ingestion Queue Nodes (Glowing Cyan Spheres) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {queueNodes.map((pos, i) => (
          <mesh key={`q-${i}`} position={pos}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </Float>

      {/* Worker Sandboxes (Crystalline Indigo Octahedrons) */}
      <Float speed={2.4} rotationIntensity={0.5} floatIntensity={0.4}>
        {workerNodes.map((pos, i) => (
          <group key={`w-${i}`} position={pos}>
            <mesh>
              <octahedronGeometry args={[0.13, 0]} />
              <meshStandardMaterial
                color="#818cf8"
                emissive="#6366f1"
                emissiveIntensity={1.4}
                roughness={0.1}
                metalness={0.9}
                wireframe={false}
              />
            </mesh>
            {/* Ambient wireframe halo for high-tech SaaS look */}
            <mesh>
              <octahedronGeometry args={[0.16, 0]} />
              <meshBasicMaterial
                color="#a5b4fc"
                wireframe
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>
        ))}
      </Float>

      {/* Stream Egress Nodes (Emerald / Cyan Pulsing Relays) */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        {streamNodes.map((pos, i) => (
          <mesh key={`s-${i}`} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#059669"
              emissiveIntensity={1.3}
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>
        ))}
      </Float>

      {/* Flowing Data Stream Packets */}
      <points ref={streamParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#38bdf8"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Outer Orbit Ring to give depth and architecture framing */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.9, 1.93, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} side={THREE.DoubleSide} />
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
        <pointLight position={[-3, -2, -2]} intensity={0.9} color="#38bdf8" />
        <pointLight position={[3, 2, 2]} intensity={1.1} color="#818cf8" />
        <fog attach="fog" args={['#050814', 3.0, 6.5]} />

        {/* Positioned on desktop towards the right to frame the profile content */}
        <group position={[1.4, 0, -0.2]}>
          <DistributedPipeline />
        </group>
      </Canvas>
    </div>
  );
}
