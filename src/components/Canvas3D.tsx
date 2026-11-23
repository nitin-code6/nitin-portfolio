'use client';
import { useEffect, useRef } from 'react';
import styles from './Canvas3D.module.css';

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export default function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Nodes generation (Distributed Sphere & Neural Lattice)
    const nodeCount = 55;
    const nodes: Node3D[] = [];
    const colors = ['#38bdf8', '#818cf8', '#0ea5e9', '#34d399', '#a78bfa'];

    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution on a 3D sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.2 + 1.8,
        color: colors[i % colors.length]
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let rotY = 0;
    let rotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
      targetRotY = mouseX * 0.6;
      targetRotX = -mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Perspective Projection Parameters
    const fov = 420;

    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse rotation + constant slow ambient spin
      rotY += (targetRotY + time * 0.4 - rotY) * 0.05;
      rotX += (targetRotX - rotX) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const centerX = width * 0.72; // Positioned behind the avatar / hero right
      const centerY = height * 0.48;

      // Project 3D nodes to 2D
      const projected = nodes.map((node) => {
        // Slow internal pulsation
        const nx = node.baseX + Math.sin(time + node.baseZ) * 8;
        const ny = node.baseY + Math.cos(time + node.baseX) * 8;
        const nz = node.baseZ + Math.sin(time * 0.8 + node.baseY) * 8;

        // Rotate Y
        const x1 = nx * cosY + nz * sinY;
        const z1 = -nx * sinY + nz * cosY;

        // Rotate X
        const y2 = ny * cosX - z1 * sinX;
        const z2 = ny * sinX + z1 * cosX;

        // Perspective scale factor
        const scale = fov / (fov + z2 + 180);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.12, Math.min(0.9, (z2 + radius) / (2 * radius) + 0.15));

        return { px, py, scale, z: z2, alpha, node };
      });

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => b.z - a.z);

      // Draw neural connections (lines between close nodes)
      const maxDistance = 115;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.28 * Math.min(projected[i].alpha, projected[j].alpha);
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw glowing 3D nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.px < 0 || p.px > width || p.py < 0 || p.py > height) continue;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.2, p.node.size * p.scale), 0, Math.PI * 2);
        ctx.fillStyle = p.node.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Subtle glow halo on front nodes
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.node.size * p.scale * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = p.node.color;
          ctx.globalAlpha = p.alpha * 0.22;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvasElement} />
    </div>
  );
}
