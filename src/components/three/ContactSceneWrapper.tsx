'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';

const Contact3DScene = dynamic(
  () => import('./Contact3DScene'),
  { ssr: false }
);

export default function ContactSceneWrapper() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
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
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {inView ? (
        <Suspense fallback={null}>
          <Contact3DScene />
        </Suspense>
      ) : (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(14, 165, 233, 0.05), transparent 70%)'
          }}
        />
      )}
    </div>
  );
}
