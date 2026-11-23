'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';

const DistributedSystemScene = dynamic(
  () => import('./DistributedSystemScene'),
  { ssr: false }
);

export default function HeroSceneWrapper() {
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {inView ? (
        <Suspense fallback={<div className="hero-3d-skeleton" />}>
          <DistributedSystemScene />
        </Suspense>
      ) : (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(14, 165, 233, 0.08), transparent 70%)'
          }}
        />
      )}
    </div>
  );
}
