'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Communication Mesh / Global Network Sphere
function NetworkGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Satellite beacon coordinates on a sphere
  const beaconNodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.1;
      pts.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      ]);
    }
    return pts;
  }, []);

  // Background floating cyber dust particles
  const particlePositions = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = ((i * 13) % 50) / 50;
      const v = ((i * 29) % 50) / 50;
      const angle = u * Math.PI * 2;
      const dist = 2.2 + (v * 1.5);
      positions[i * 3] = Math.cos(angle) * dist;
      positions[i * 3 + 1] = (Math.sin(angle) * dist * 0.7) + (((i * 7) % 10) / 10 - 0.5);
      positions[i * 3 + 2] = (((i * 37) % 50) / 50 - 0.5) * 2;
    }
    return positions;
  }, []);

  // Interconnecting signal lines between beacons
  const connectionLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < beaconNodes.length; i++) {
      for (let j = i + 1; j < beaconNodes.length; j++) {
        const p1 = new THREE.Vector3(...beaconNodes[i]);
        const p2 = new THREE.Vector3(...beaconNodes[j]);
        if (p1.distanceTo(p2) < 2.2) {
          pts.push(p1);
          pts.push(p2);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [beaconNodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.15;
      const mouseY = state.pointer.y * 0.12;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouseX + state.clock.elapsedTime * 0.08,
        2,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouseY + Math.sin(state.clock.elapsedTime * 0.15) * 0.05,
        2,
        delta
      );
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y -= delta * 0.05;
      outerSphereRef.current.rotation.z += delta * 0.03;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Geodesic Communication Sphere (Wireframe) */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[2.05, 2]} />
        <meshBasicMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={0.09}
        />
      </mesh>

      {/* Inner Core Ambient Sphere */}
      <mesh>
        <sphereGeometry args={[1.7, 24, 24]} />
        <meshStandardMaterial
          color="#030712"
          emissive="#0284c7"
          emissiveIntensity={0.15}
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Satellite Beacons */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        {beaconNodes.map((pos, i) => (
          <mesh key={`b-${i}`} position={pos}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0ea5e9"
              emissiveIntensity={1.3}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </Float>

      {/* Dynamic Signal Connection Pathways */}
      <lineSegments geometry={connectionLines}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>

      {/* Floating Constellation Dust */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#818cf8"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function Contact3DScene() {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 4]} intensity={0.9} color="#ffffff" />
        <pointLight position={[-3, -2, -2]} intensity={0.8} color="#0ea5e9" />
        <pointLight position={[3, 2, 2]} intensity={0.9} color="#6366f1" />
        <fog attach="fog" args={['#050814', 3.2, 7.0]} />

        {/* Positioned centrally with high depth */}
        <group position={[0, -0.1, -0.3]}>
          <NetworkGlobe />
        </group>
      </Canvas>
    </div>
  );
}
