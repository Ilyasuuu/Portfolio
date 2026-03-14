'use client';

import React from 'react';

interface PlanetProps {
  color: string;
  isSelected?: boolean;
  isBlueprintMode?: boolean;
}

export default function Planet({ color, isSelected, isBlueprintMode }: PlanetProps) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const rgba = (a: number) => `rgba(${r},${g},${b},${a})`;

  if (isBlueprintMode) {
    return (
      <div className="w-full h-full relative flex items-center justify-center pointer-events-none transition-all duration-700">
        {/* Wireframe Outer Ring */}
        <div 
          className="absolute rounded-full border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ width: '92%', height: '92%' }}
        />
        
        {/* Wireframe Core with Grid */}
        <div 
          className="absolute rounded-full border border-white/20 overflow-hidden"
          style={{ 
            width: '88%', 
            height: '88%',
            background: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '15px 15px',
            backgroundPosition: 'center',
          }}
        >
          {/* Internal Wireframe Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10" />
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5 scale-75" />
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5 scale-50" />
        </div>

        {/* Technical Callout Circle */}
        <div 
          className="absolute rounded-full border-[0.5px] border-white/40 animate-pulse"
          style={{ width: '100%', height: '100%', opacity: 0.3 }}
        />
      </div>
    );
  }

  return (
    // will-change pre-promotes to GPU layer, drop-shadow done via filter on this wrapper
    <div
      className="w-full h-full relative flex items-center justify-center pointer-events-none transition-all duration-700"
      style={{
        // Static drop-shadow: cached by compositor, zero per-frame cost
        filter: `drop-shadow(0 0 22px ${rgba(0.55)}) drop-shadow(0 0 55px ${rgba(0.25)})`,
        willChange: 'transform', // keep this layer promoted
      }}
    >
      {/* Ambient pulse ring — opacity+transform only = compositor-only */}
      {!isSelected && (
        <div
          className="absolute rounded-full animate-orb-pulse"
          style={{
            width: '106%',
            height: '106%',
            border: `1px solid ${rgba(0.18)}`,
            // No background — border-only ring avoids any fill overdraw
          }}
        />
      )}

      {/* 
        Main Glass Orb
        ─────────────
        No backdropFilter: each backdropFilter creates a compositor layer that reads,
        blurs, and re-composites everything behind it every frame — very expensive.
        Replaced with a richer opaque dark base + layered radial-gradients that
        give the same glass depth illusion with zero per-frame cost.
      */}
      <div
        className="absolute rounded-full"
        style={{
          width: '88%',
          height: '88%',
          // Dark glass base + color tinting + translucency via gradients only
          background: `
            radial-gradient(circle at 35% 28%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.04) 36%),
            radial-gradient(circle at 68% 74%, ${rgba(0.55)} 0%, transparent 52%),
            radial-gradient(circle at 50% 50%, ${rgba(0.20)} 0%, transparent 90%),
            linear-gradient(145deg, rgba(255,255,255,0.10) 0%, ${rgba(0.30)} 55%, rgba(0,0,0,0.55) 100%)
          `,
          border: `1.5px solid rgba(255,255,255,0.30)`,
          boxShadow: `
            inset 0 1px 18px rgba(255,255,255,0.28),
            inset 2px 2px 6px rgba(255,255,255,0.18),
            inset -4px -4px 14px ${rgba(0.38)},
            0 6px 28px ${rgba(0.38)}
          `,
        }}
      >
        {/* Primary specular highlight — static, zero repaint cost */}
        <div
          className="absolute rounded-full"
          style={{
            top: '9%',
            left: '18%',
            width: '42%',
            height: '27%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.08) 60%, transparent 100%)',
            filter: 'blur(2.5px)',
            transform: 'rotate(-18deg)',
          }}
        />

        {/* Secondary specular dot */}
        <div
          className="absolute rounded-full"
          style={{
            top: '16%',
            left: '57%',
            width: '13%',
            height: '9%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.92) 0%, transparent 100%)',
            filter: 'blur(1px)',
          }}
        />

        {/* Bottom rim glow — static */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: '7%',
            left: '10%',
            width: '80%',
            height: '30%',
            background: `radial-gradient(ellipse, ${rgba(0.45)} 0%, transparent 70%)`,
            filter: 'blur(7px)',
          }}
        />

        {/*
          Shimmer sweep — uses transform:rotate() which is compositor-only.
          The browser composites this layer once and spins it on the GPU.
          No repaints occur during the animation.
        */}
        <div
          className="absolute inset-0 rounded-full animate-orb-shimmer"
          style={{
            background: `linear-gradient(
              225deg,
              transparent 38%,
              ${rgba(0.22)} 58%,
              transparent 68%
            )`,
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Rim ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '88%',
          height: '88%',
          border: `1px solid ${rgba(0.30)}`,
          boxShadow: `0 0 18px ${rgba(0.18)}, inset 0 0 18px ${rgba(0.08)}`,
        }}
      />
    </div>
  );
}
