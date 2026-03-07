'use client';

import React, { useEffect, useRef } from 'react';

export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    // Target 30fps for background particles — imperceptible for ambient dust,
    // halves the GPU submission rate vs 60fps.
    const TARGET_MS = 1000 / 30;

    type Particle = {
      x: number; y: number;
      radius: number;
      vx: number; vy: number;
      alpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    };
    let particles: Particle[] = [];

    const resize = () => {
      // Match logical pixels — avoid DPR scaling on a purely decorative canvas
      // to keep the rasterization cost low.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Reduce density vs original: 1 particle per 14k px² (was 12k)
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.4 + 0.4,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12 - 0.04,
          alpha: Math.random() * 0.35 + 0.08,
          pulseSpeed: Math.random() * 0.018 + 0.004,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      // Throttle to 30fps — skip frames to save GPU time
      const elapsed = timestamp - lastTime;
      if (elapsed < TARGET_MS) return;
      lastTime = timestamp - (elapsed % TARGET_MS); // stay in sync

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = timestamp * 0.001;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        else if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        else if (p.y > canvas.height + 10) p.y = -10;

        const twinkling = p.alpha + Math.sin(time * p.pulseSpeed * 100 + p.pulseOffset) * 0.18;
        const alpha = twinkling < 0 ? 0 : twinkling > 1 ? 1 : twinkling; // fast clamp

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        // Integer coords avoid sub-pixel anti-aliasing work
        ctx.arc(p.x | 0, p.y | 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        // shadowBlur REMOVED — it causes GPU overdraw on every particle every frame.
        // The twinkling opacity alone gives the starfield effect at a fraction of the cost.
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-55"
      // No mix-blend-screen — normal blend is zero-cost
    />
  );
}
