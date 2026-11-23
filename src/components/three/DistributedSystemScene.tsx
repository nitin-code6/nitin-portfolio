'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Distributed Systems 3D Visual (Queue -> Workers -> Event Stream)
function DistributedNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Queue Nodes (Producer / Ingestion)
  const queuePositions = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => [
      -2.4 + (i * 0.45),
      Math.sin(i * 0.8) * 0.35,
      Math.cos(i * 0.6) * 0.4
    ] as [number, number, number]);
  }, []);

  // Worker Nodes (Isolated Execution Sandboxes)
  const workerPositions = useMemo(() => {
    return [
      [-0.4, 0.9, 0.2],
      [-0.4, 0.3, -0.4],
      [-0.4, -0.3, 0.4],
      [-0.4, -0.9, -0.2]
    ] as [number, number, number][];
  }, []);

  // Stream Nodes (Kafka / SSE Event Stream)
  const streamPositions = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => [
      1.5 + (i * 0.35),
      Math.sin(i * 0.9) * 0.45,
      Math.cos(i * 0.7) * 0.3
    ] as [number, number, number]);
  }, []);

  // Gentle procedural rotation & floating oscillation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle mouse parallax
      const mouseX = state.pointer.x * 0.25;
      const mouseY = state.pointer.y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y, 
        mouseX + Math.sin(state.clock.elapsedTime * 0.3) * 0.1, 
        3, 
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x, 
        -mouseY + Math.cos(state.clock.elapsedTime * 0.25) * 0.08, 
        3, 
        delta
      );
    }
  });

  // Connecting line paths representing distributed event flow
  const lineGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    queuePositions.forEach((qp) => {
      workerPositions.forEach((wp) => {
        pts.push(new THREE.Vector3(qp[0], qp[1], qp[2]));
        pts.push(new THREE.Vector3(wp[0], wp[1], wp[2]));
      });
    });
    workerPositions.forEach((wp) => {
      streamPositions.forEach((sp) => {
        pts.push(new THREE.Vector3(wp[0], wp[1], wp[2]));
        pts.push(new THREE.Vector3(sp[0], sp[1], sp[2]));
      });
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [queuePositions, workerPositions, streamPositions]);

  return (
    <group ref={groupRef}>
      {/* Dynamic connecting network lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.16} />
      </lineSegments>

      {/* Queue Nodes */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {queuePositions.map((pos, i) => (
          <mesh key={`q-${i}`} position={pos}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial 
              color="#38bdf8" 
              emissive="#0284c7" 
              emissiveIntensity={0.8} 
              roughness={0.2} 
              metalness={0.8} 
            />
          </mesh>
        ))}
      </Float>

      {/* Worker Sandboxes (Hexagonal / Octahedral nodes) */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
        {workerPositions.map((pos, i) => (
          <mesh key={`w-${i}`} position={pos}>
            <octahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial 
              color="#818cf8" 
              emissive="#6366f1" 
              emissiveIntensity={1.2} 
              roughness={0.15} 
              metalness={0.85} 
            />
          </mesh>
        ))}
      </Float>

      {/* Event Stream (Streamline nodes) */}
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
        {streamPositions.map((pos, i) => (
          <mesh key={`s-${i}`} position={pos}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial 
              color="#34d399" 
              emissive="#10b981" 
              emissiveIntensity={0.9} 
              roughness={0.2} 
              metalness={0.7} 
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function DistributedSystemScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, -2, -2]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[4, 3, 2]} intensity={0.9} color="#818cf8" />
        <fog attach="fog" args={['#080d1a', 3.5, 7]} />

        <DistributedNodes />
      </Canvas>
    </div>
  );
}
