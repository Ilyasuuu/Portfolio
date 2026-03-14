'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon, ChevronLeft, ChevronRight, Mail, Linkedin, Copy, Check } from 'lucide-react';
import GlassIdentityCard from './GlassIdentityCard';
import DustParticles from './DustParticles';
import Planet from './Planet';

const ITEMS = [
  {
    id: 'about',
    title: 'About',
    subtitle: 'The Architect',
    content: 'I am a Creative Frontend Architect specializing in hyper-smooth, futuristic web experiences. My work bridges the gap between high-end design and flawless engineering.',
    color: 'from-blue-400/50 to-indigo-600/50',
    planetColor: '#6366f1',
    glow: 'shadow-[0_0_80px_rgba(99,102,241,0.6)]',
    cardGradient: 'from-blue-400/50 via-white/10 to-indigo-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.3)]',
    overlayGradient: 'from-blue-500/20 via-transparent to-indigo-500/20',
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Selected Works',
    content: 'A curated collection of digital experiences, pushing the boundaries of what is possible on the modern web with cutting-edge animations and thoughtful design systems.',
    color: 'from-purple-400/50 to-pink-600/50',
    planetColor: '#d946ef',
    glow: 'shadow-[0_0_80px_rgba(217,70,239,0.6)]',
    cardGradient: 'from-purple-400/50 via-white/10 to-pink-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(217,70,239,0.3)]',
    overlayGradient: 'from-purple-500/20 via-transparent to-pink-500/20',
  },
  {
    id: 'skills',
    title: 'Skills',
    subtitle: 'The Arsenal',
    content: 'Next.js, React, Tailwind CSS, Framer Motion, GSAP, TypeScript, Node.js, and an unrelenting obsession with 60fps performance and pixel-perfect design.',
    color: 'from-emerald-400/50 to-cyan-600/50',
    planetColor: '#10b981',
    glow: 'shadow-[0_0_80px_rgba(16,185,129,0.6)]',
    cardGradient: 'from-emerald-400/50 via-white/10 to-cyan-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.3)]',
    overlayGradient: 'from-emerald-500/20 via-transparent to-cyan-500/20',
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Initiate Link',
    content: 'Ready to build the future? Reach out to start a conversation about your next visionary project.',
    color: 'from-orange-400/50 to-red-600/50',
    planetColor: '#f97316',
    glow: 'shadow-[0_0_80px_rgba(249,115,22,0.6)]',
    cardGradient: 'from-orange-400/50 via-white/10 to-red-500/50',
    cardShadow: 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(249,115,22,0.3)]',
    overlayGradient: 'from-orange-500/20 via-transparent to-orange-500/20',
  },
];

const PROJECTS_DATA = [
  {
    id: 'project-one',
    title: 'Project Title',
    tagline: 'Project soon soon project',
    description: 'Example how it look like. This is a placeholder for your future visionary project details.',
    tags: ['Coming Soon'],
    color: 'from-purple-500 to-pink-500',
    media: 'https://images.unsplash.com/photo-1551288049-bbda48642153?auto=format&fit=crop&q=80&w=2070',
  },
];

const ModernX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function AuraPortfolio() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isEmailExpanded, setIsEmailExpanded] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isCareerPanelOpen, setIsCareerPanelOpen] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const identityCardRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [tetherPoints, setTetherPoints] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  // Measure tether line endpoints
  useEffect(() => {
    const measure = () => {
      const cardEl = identityCardRef.current;
      const carouselEl = carouselRef.current;
      const parentEl = containerRef.current;
      if (!cardEl || !carouselEl || !parentEl) return;

      const parentRect = parentEl.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();
      const carouselRect = carouselEl.getBoundingClientRect();

      // Stable endpoints based on layout containers, not moving elements
      const startX = cardRect.right - parentRect.left + 30; // 30px space after card
      const startY = cardRect.top + cardRect.height / 2 - parentRect.top;
      
      // Target the fixed center of the carousel area
      const centerX = carouselRect.left + carouselRect.width / 2 - parentRect.left;
      const centerY = carouselRect.top + carouselRect.height / 2 - parentRect.top;
      
      // Stop 250px before the carousel center (radius 170px + 80px gap)
      const endX = centerX - 250; 
      const endY = centerY;

      setTetherPoints({ x1: startX, y1: startY, x2: endX, y2: endY });
    };

    measure();
    // Re-measure after spring animations settle
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 400);
    const t3 = setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('resize', measure);
    };
  }, [selectedId]); // Removed activeIndex to prevent "stretching" during transitions

  const activeColor = useMemo(() => ITEMS[activeIndex].planetColor, [activeIndex]);

  useEffect(() => {
    if (selectedId) {
      setExpandedId(selectedId);
    } else {
      setIsAiPanelOpen(false);
      setIsCareerPanelOpen(false);
      const timer = setTimeout(() => setExpandedId(null), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedId]);

  const handleNext = useCallback(() => {
    if (selectedId) return;
    setActiveIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
  }, [selectedId]);

  const handlePrev = useCallback(() => {
    if (selectedId) return;
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
      if (e.key === 'Enter' && !selectedId) setSelectedId(ITEMS[activeIndex].id);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, selectedId, handleNext, handlePrev]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedId) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelDebounce.current) return;

      if (e.deltaY > 20 || e.deltaX > 20) {
        handleNext();
      } else if (e.deltaY < -20 || e.deltaX < -20) {
        handlePrev();
      }
      wheelDebounce.current = setTimeout(() => {
        wheelDebounce.current = null;
      }, 450);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [selectedId, handleNext, handlePrev]);

  const selectedItem = ITEMS.find((item) => item.id === selectedId);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#050508] text-white flex items-center justify-center selection:bg-white/20"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient colour blobs — no mix-blend-screen to avoid expensive compositing passes */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full blur-[130px] opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f140, #d946ef20, transparent)' }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ background: '#7c3aed20', animationDuration: '12s' }}
        />

        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

        {/* Dust star particles */}
        <DustParticles />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        {/* Neon Tether Line */}
        <AnimatePresence>
          {tetherPoints && !selectedId && (
            <motion.svg
              key="tether"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-[5] pointer-events-none hidden md:block"
              width="100%"
              height="100%"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="aurora-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="aurora-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
                </filter>
                <linearGradient id="aurora-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={activeColor} stopOpacity="0" />
                  <stop offset="10%" stopColor={activeColor} stopOpacity="0.4" />
                  <stop offset="30%" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor={activeColor} stopOpacity="1" />
                  <stop offset="70%" stopColor="#fff" stopOpacity="0.8" />
                  <stop offset="90%" stopColor={activeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Generate aurora wave paths */}
              {(() => {
                const x1 = tetherPoints.x1;
                const y1 = tetherPoints.y1;
                const x2 = tetherPoints.x2;
                const y2 = tetherPoints.y2;
                const dx = x2 - x1;
                const dy = y2 - y1;

                // Build a wavy cubic bezier path with N segments
                const buildWavePath = (amplitude: number, freq: number, phaseOffset: number, segments: number = 10) => {
                  const points: string[] = [`M ${x1} ${y1}`];
                  for (let i = 0; i < segments; i++) {
                    const t2 = (i + 1) / segments;
                    const tMid = (i + 0.5) / segments;

                    // Wave calculation
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const nx = -dy / len;
                    const ny = dx / len;

                    const waveMid = Math.sin((tMid * freq + phaseOffset) * Math.PI * 2) * amplitude;
                    const wave2 = Math.sin((t2 * freq + phaseOffset) * Math.PI * 2) * amplitude;

                    const cx = x1 + dx * tMid + nx * waveMid;
                    const cy = y1 + dy * tMid + ny * waveMid;
                    const ex = x1 + dx * t2 + nx * wave2;
                    const ey = y1 + dy * t2 + ny * wave2;

                    points.push(`Q ${cx} ${cy} ${ex} ${ey}`);
                  }
                  return points.join(' ');
                };

                // Configuration for the "bundle" of lines — perfectly looped for zero-jump flow
                const lineConfigs = [
                  { amp: 18, freq: 0.8, phase: 0.0, opacity: 0.35, width: 2.8, dash: 160, gap: 40, speed: 6 },
                  { amp: 28, freq: 0.7, phase: 0.2, opacity: 0.65, width: 1.4, dash: 120, gap: 30, speed: 4 },
                  { amp: 12, freq: 0.9, phase: 0.4, opacity: 0.85, width: 0.8, dash: 100, gap: 50, speed: 3.2 },
                  { amp: 35, freq: 0.6, phase: 0.6, opacity: 0.40, width: 2.2, dash: 200, gap: 60, speed: 5.5 },
                  { amp: 22, freq: 1.0, phase: 0.8, opacity: 0.75, width: 1.0, dash: 80,  gap: 40, speed: 3.8 },
                  { amp: 25, freq: 0.7, phase: 0.1, opacity: 0.55, width: 1.8, dash: 220, gap: 30, speed: 5 },
                  { amp: 32, freq: 0.8, phase: 0.3, opacity: 0.90, width: 0.6, dash: 140, gap: 60, speed: 2.8 },
                  { amp: 8,  freq: 1.2, phase: 0.5, opacity: 0.80, width: 0.4, dash: 90,  gap: 30, speed: 2.5 },
                ];

                return (
                  <motion.g
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 0.5, -0.5, 0] // Subtle global tilt oscillation
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {lineConfigs.map((cfg, idx) => {
                      const period = cfg.dash + cfg.gap;
                      const rollDuration = cfg.speed * 1.5; // Staggered rolling speed
                      return (
                        <motion.path
                          key={idx}
                          d={buildWavePath(cfg.amp, cfg.freq, cfg.phase)}
                          fill="none"
                          stroke="url(#aurora-grad)"
                          strokeWidth={cfg.width}
                          strokeLinecap="round"
                          opacity={cfg.opacity}
                          filter="url(#aurora-glow)"
                          initial={{ pathLength: 0, strokeDashoffset: 0, y: 0 }}
                          animate={{ 
                            pathLength: 1,
                            strokeDashoffset: [-period, 0],
                            y: [-(idx * 1.5), idx * 1.5, -(idx * 1.5)] // Independent rolling motion
                          }}
                          transition={{ 
                            pathLength: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 },
                            strokeDashoffset: { duration: cfg.speed, repeat: Infinity, ease: 'linear' },
                            y: { duration: rollDuration, repeat: Infinity, ease: 'easeInOut' }
                          }}
                          style={{ 
                            strokeDasharray: `${cfg.dash} ${cfg.gap}`,
                          } as React.CSSProperties}
                        />
                      );
                    })}
                  </motion.g>
                );
              })()}
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Left — Identity Card */}
        <div className="w-full md:w-[30%] h-full flex items-center justify-center p-8 z-20 pointer-events-none">
          <div ref={identityCardRef} className="pointer-events-auto w-full max-w-[320px]">
            <GlassIdentityCard items={ITEMS} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Right — Carousel — contain prevents carousel reflows leaking to the rest of the DOM */}
        <div
          ref={carouselRef}
          className="w-full md:w-[70%] h-full flex items-center justify-center relative"
          style={{ contain: 'layout paint' } as React.CSSProperties}
        >
          {ITEMS.map((item, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;
            const isSelected = selectedId === item.id;
            const isExpanded = expandedId === item.id;
            const isHidden = expandedId !== null && !isExpanded;

            // Pure 2D — only transform+opacity (both compositor-only, zero repaints)
            const x = isExpanded ? 0 : offset * 250;
            const scale = isExpanded ? 1 : 1 - absOffset * 0.18;
            // Steeper opacity falloff replaces the old animated blur (blur = repaint every frame)
            const opacity = isHidden ? 0 : Math.max(1 - absOffset * 0.65, 0);

            return (
              <motion.div
                key={item.id}
                id={`orb-${item.id}`}
                onClick={() => {
                  if (isCenter && !selectedId) {
                    setSelectedId(item.id);
                  } else if (!selectedId) {
                    setActiveIndex(index);
                  }
                }}
                initial={false}
                animate={
                  isExpanded
                    ? { x: 0, scale: 1, opacity: 1 }
                    : { x, scale, opacity }
                }
                style={{
                  zIndex: isExpanded ? 100 : ITEMS.length - absOffset,
                  // Pre-promote to GPU layer so there's no promotion jank at animation start
                  willChange: 'transform, opacity',
                } as React.CSSProperties}
                transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
                className={`absolute flex items-center justify-center cursor-pointer ${isExpanded
                  ? 'fixed inset-0 z-[100] pointer-events-none'
                  : 'w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]'
                  }`}
              >
                {/* Glow + orb container (fixed size so the orb never distorts) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{ 
                    filter: isCenter ? 'blur(0px)' : `blur(${Math.min(absOffset * 2.5, 5)}px)`,
                    opacity: isCenter ? 1 : 0.6 + (1 - Math.min(absOffset, 1)) * 0.4
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px]">

                    {/* Pulsing ambient glow under the orb */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} pointer-events-none`}
                      style={{ filter: 'blur(55px)' } as React.CSSProperties}
                      initial={false}
                      animate={
                        isCenter && !isSelected
                          ? { scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }
                          : { scale: 0.7, opacity: 0 }
                      }
                      transition={
                        isCenter && !isSelected
                          ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.4 }
                      }
                    />

                    {/* Label text */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                      animate={{ opacity: isSelected ? 0 : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-white/75 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] mb-1 drop-shadow-lg">
                        {item.subtitle}
                      </p>
                      <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white drop-shadow-xl">
                        {item.title}
                      </h2>
                    </motion.div>

                    {/* The CSS Glass Orb — flies to modal corner via layoutId */}
                    <motion.div
                      layoutId={`orb-${item.id}`}
                      className="absolute inset-0 z-20"
                      animate={{ opacity: isSelected ? 0 : 1 }}
                      transition={{
                        layout: { type: 'tween', duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.15, delay: isSelected ? 0.06 : 0.32 },
                      }}
                    >
                      <Planet color={item.planetColor} isSelected={false} />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="expanded-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 pointer-events-auto"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal card — Skills gets a cinematic 16:10 grow; Projects gets a cinematic 16:9 grow; others keep scale */}
            {(() => {
              const isSkills = selectedItem.id === 'skills';
              const isProjects = selectedItem.id === 'projects';
              const isCinematic = isSkills || isProjects;

              return (
                <motion.div
                  initial={
                    isCinematic
                      ? { opacity: 0, scale: 0.85, y: 80, rotateX: 12, transformPerspective: 2000, filter: 'blur(20px)' }
                      : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  animate={
                    isCinematic
                      ? { opacity: 1, scale: 1, y: 0, rotateX: 0, transformPerspective: 2000, filter: 'blur(0px)' }
                      : { opacity: 1, scale: 1, y: 0 }
                  }
                  exit={
                    isCinematic
                      ? { opacity: 0, scale: 0.85, y: 80, rotateX: 12, transformPerspective: 2000, filter: 'blur(20px)' }
                      : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  transition={
                    isCinematic
                      ? { duration: 0.85, ease: [0.16, 1, 0.3, 1] } // Buttery tween, no jumping
                      : { delay: 0.05, duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }
                  }
                  className={
                    isCinematic
                      ? `relative rounded-[2.5rem] overflow-hidden border border-white/15 ${selectedItem.id === 'projects' ? 'bg-white/[0.04]' : 'bg-white/[0.06]'} backdrop-blur-3xl flex flex-col shadow-2xl shrink-0`
                      : 'relative w-full h-full max-w-6xl max-h-[820px] rounded-[2.5rem] overflow-hidden border border-white/15 bg-white/[0.06] backdrop-blur-3xl flex flex-col shadow-2xl'
                  }
                  style={{
                    ...(isSkills
                      ? {
                        width: 'min(85vw, 1440px)',
                        height: 'min(53.125vw, 85vh)',
                        maxWidth: '85vw',
                        maxHeight: '85vh',
                        aspectRatio: '16 / 10',
                        willChange: 'opacity, transform, filter',
                        transform: 'translateZ(0)',
                        transformStyle: 'preserve-3d',
                      }
                      : isProjects
                        ? {
                          width: 'min(92vw, 1600px)',
                          height: 'min(51.75vw, 88vh)',
                          maxWidth: '92vw',
                          maxHeight: '88vh',
                          aspectRatio: '16 / 9',
                          willChange: 'opacity, transform, filter',
                          transform: 'translateZ(0)',
                          transformStyle: 'preserve-3d',
                        }
                        : {}),
                    boxShadow: `inset 0 0 100px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.6)`,
                    backfaceVisibility: 'hidden',
                  } as React.CSSProperties}
                >
                  {/* Tint overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedItem.color} opacity-[0.18] mix-blend-screen pointer-events-none`} />

                  {/* Mini Orb — layout-animated in from the carousel */}
                  <motion.div
                    layoutId={`orb-${selectedItem.id}`}
                    className="absolute z-50 pointer-events-none"
                    style={{ top: '28px', right: '82px', width: '50px', height: '50px' } as React.CSSProperties}
                    transition={{ 
                      layout: { 
                        type: 'tween', 
                        duration: 0.85, 
                        ease: [0.16, 1, 0.3, 1]  // Matches modal exactly
                      } 
                    }}
                  >
                    <Planet color={selectedItem.planetColor} />
                  </motion.div>

                  {/* Close */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedId(null)}
                    className="absolute top-7 right-7 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center backdrop-blur-md transition-colors"
                  >
                    <CloseIcon className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Content */}
                  <div className={`relative z-10 flex flex-col h-full ${selectedItem.id === 'projects' ? 'p-0' : 'p-8 sm:p-16 md:p-20'} w-full hide-scrollbar ${selectedItem.id === 'contact' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                    <div className={
                      selectedItem.id === 'contact'
                        ? 'w-full h-full flex flex-col'
                        : selectedItem.id === 'skills'
                          ? 'w-full flex flex-col items-center text-center'
                          : selectedItem.id === 'projects'
                            ? 'w-full h-full flex flex-row'
                            : 'max-w-3xl'
                    }>
                      {selectedItem.id !== 'projects' && (
                        <>
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                            className="text-white/50 text-sm font-mono uppercase tracking-[0.25em] mb-4"
                          >
                            {selectedItem.subtitle}
                          </motion.p>
                          <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.26 }}
                            className="text-5xl sm:text-7xl md:text-8xl font-display font-light tracking-tighter text-white mb-10"
                          >
                            {selectedItem.title}
                          </motion.h2>
                        </>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`${selectedItem.id === 'projects' ? 'w-full h-full' : 'prose prose-invert prose-lg sm:prose-xl max-w-none'} ${selectedItem.id === 'contact' ? 'flex-1 flex flex-col items-center justify-center overflow-visible' : ''}`}
                      >
                        {selectedItem.id === 'contact' ? (
                          <div className="relative w-full max-w-sm sm:max-w-xl h-[360px] sm:h-[420px] mx-auto mt-6 sm:mt-10 pointer-events-none">

                            {/* Modern X (Twitter) Orb */}
                            <div className="absolute top-0 left-0 sm:left-4 pointer-events-auto">
                              <a
                                href="#"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110"
                              >
                                <ModernX className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
                              </a>
                            </div>

                            {/* LinkedIn Orb */}
                            <div className="absolute top-0 right-0 sm:right-4 pointer-events-auto">
                              <a
                                href="#"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110"
                              >
                                <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" strokeWidth={1.5} />
                              </a>
                            </div>

                            {/* Mail Orb (Interactive Email Bar) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto">
                              <div className="relative flex items-center">
                                {/* The Orb itself */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsEmailExpanded(!isEmailExpanded);
                                  }}
                                  className={`relative z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${isEmailExpanded ? 'bg-white/[0.15]' : 'bg-white/[0.05]'} hover:bg-white/[0.15] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110 focus:outline-none`}
                                >
                                  <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" strokeWidth={1.5} />
                                </button>

                                {/* Sliding Email Bar */}
                                <motion.div
                                  initial={{ maxWidth: 0, opacity: 0 }}
                                  animate={{
                                    maxWidth: isEmailExpanded ? 300 : 0,
                                    opacity: isEmailExpanded ? 1 : 0
                                  }}
                                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                                  className="absolute left-[100%] sm:left-[100%] w-[190px] sm:w-[250px] overflow-hidden h-[60px] sm:h-[70px] bg-white/[0.08] backdrop-blur-2xl border-y border-r border-white/20 rounded-r-full flex items-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                                  style={{ zIndex: 10, willChange: 'max-width, transform, opacity' }}
                                >
                                  <div className="pl-4 sm:pl-5 pr-4 w-full flex items-center justify-between whitespace-nowrap overflow-hidden">
                                    <span className="text-white/90 font-mono text-sm sm:text-base mr-3 truncate select-all">
                                      hello@visionary.dev
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText("hello@visionary.dev");
                                        setHasCopied(true);
                                        setTimeout(() => setHasCopied(false), 2000);
                                      }}
                                      className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                                      title="Copy to clipboard"
                                    >
                                      {hasCopied ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-white/70" />
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        ) : selectedItem.id === 'skills' ? (
                          <div className="flex-1 flex flex-col items-center justify-center gap-5 mt-32 sm:mt-31 pb-12 sm:pb-20">
                            {/* AI Skill Card — toggles left panel */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => setIsAiPanelOpen(v => !v)}
                              className={`w-[144px] sm:w-[195px] h-[60px] sm:h-[70px] rounded-[18px] border backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none ${isAiPanelOpen ? 'bg-emerald-500/15 border-emerald-400/30' : 'bg-white/[0.04] border-white/10 hover:bg-emerald-500/10'}`}
                            >
                              <div className={`absolute inset-0 transition-opacity duration-500 ${isAiPanelOpen ? 'bg-emerald-400/10 opacity-100' : 'bg-emerald-400/5 opacity-40'}`} />
                              <div className="relative h-full flex items-center justify-center">
                                <h3 className="text-emerald-400 text-xl sm:text-2xl font-display font-bold tracking-tight drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] px-4 transform -translate-y-2">
                                  AI
                                </h3>
                              </div>
                            </motion.button>

                            {/* Career Skill Card — toggles right panel */}
                            <motion.button
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              onClick={() => setIsCareerPanelOpen(v => !v)}
                              className={`w-[144px] sm:w-[195px] h-[60px] sm:h-[70px] rounded-[18px] border backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500 cursor-pointer focus:outline-none ${isCareerPanelOpen ? 'bg-cyan-500/15 border-cyan-400/30' : 'bg-white/[0.04] border-white/10 hover:bg-cyan-500/10'}`}
                            >
                              <div className={`absolute inset-0 transition-opacity duration-500 ${isCareerPanelOpen ? 'bg-cyan-400/10 opacity-100' : 'bg-cyan-400/5 opacity-40'}`} />
                              <div className="relative h-full flex items-center justify-center">
                                <h3 className="text-cyan-400 text-xl sm:text-2xl font-display font-bold tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] px-4 transform -translate-y-2.5">
                                  Career
                                </h3>
                              </div>
                            </motion.button>
                          </div>
                        ) : selectedItem.id === 'projects' ? (
                          <div className="flex w-full h-full relative overflow-hidden">
                            {/* Main Left Content Area (70%) */}
                            <div className="w-[70%] flex flex-col h-full overflow-hidden relative">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeProjectIdx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="w-full h-full flex flex-col p-12 sm:p-20 overflow-y-auto hide-scrollbar"
                                >
                                  <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-1 px-3 bg-gradient-to-r ${PROJECTS_DATA[activeProjectIdx].color} rounded-full`} />
                                    <span className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                                      Project {activeProjectIdx + 1}
                                    </span>
                                  </div>

                                  <h2 className="text-6xl sm:text-7xl font-display font-light text-white mb-4 tracking-tighter">
                                    {PROJECTS_DATA[activeProjectIdx].title}
                                  </h2>
                                  <p className="text-xl sm:text-2xl text-white/60 font-medium mb-8 leading-relaxed">
                                    {PROJECTS_DATA[activeProjectIdx].tagline}
                                  </p>

                                  <div className="flex flex-wrap gap-2 mb-12">
                                    {PROJECTS_DATA[activeProjectIdx].tags.map(tag => (
                                      <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12">
                                    <img
                                      src={PROJECTS_DATA[activeProjectIdx].media}
                                      alt={PROJECTS_DATA[activeProjectIdx].title}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                  </div>

                                  <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-white/70 leading-relaxed text-lg">
                                      {PROJECTS_DATA[activeProjectIdx].description}
                                    </p>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>

                            {/* Bright, Glassy Vertical Divider - Acting as Right Sidebar Edge */}
                            <div className="relative w-px h-full hidden md:block shrink-0 z-20">
                              {/* Glowing Glassy Line */}
                              <div className="absolute inset-y-8 w-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                              <div className="absolute inset-y-16 -left-[1px] w-[3px] bg-gradient-to-b from-transparent via-white/80 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
                              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 blur-[2px] animate-pulse" />
                            </div>

                            {/* Sidebar Right Area (30%) - Positioned near the X button */}
                            <div
                              className="hidden md:flex w-[30%] flex-col p-8 pt-24 h-full overflow-y-auto hide-scrollbar shrink-0 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.2)] gap-4"
                            >
                              <div className="px-4 mb-2">
                                <h3 className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">Explore Works</h3>
                              </div>
                              {PROJECTS_DATA.map((project, idx) => (
                                <button
                                  key={project.id}
                                  onClick={() => setActiveProjectIdx(idx)}
                                  className={`group relative w-full p-5 rounded-2xl border text-left transition-all duration-300 ${activeProjectIdx === idx
                                    ? 'bg-white/10 border-white/20 shadow-lg translate-x-1'
                                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/15'
                                    }`}
                                >
                                  {activeProjectIdx === idx && (
                                    <motion.div
                                      layoutId="active-pill"
                                      className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b ${project.color}`}
                                    />
                                  )}
                                  <h4 className={`text-lg font-display font-medium mb-1 transition-colors ${activeProjectIdx === idx ? 'text-white' : 'text-white/70 group-hover:text-white/90'
                                    }`}>
                                    {project.title}
                                  </h4>
                                  <p className="text-xs text-white/40 font-mono line-clamp-1 italic">
                                    {project.tagline}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    </div>
                  </div>
                  {/* AI Skills Panel — floats on the left inside the Skills modal */}
                  <AnimatePresence>
                    {selectedItem.id === 'skills' && isAiPanelOpen && (
                      <motion.div
                        key="ai-panel"
                        initial={{ opacity: 0, x: -32, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -32, scale: 0.97 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 28,
                          mass: 0.9,
                          opacity: { duration: 0.25 },
                        }}
                        className="absolute left-6 top-6 bottom-6 w-[38%] z-20 rounded-[1.75rem] overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(32px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.25)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.25)',
                          willChange: 'transform, opacity',
                        } as React.CSSProperties}
                      >
                        {/* Top glare — the defining trait of real glass */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none rounded-t-[1.75rem]"
                          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)' }}
                        />
                        {/* Bottom soft reflection */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none rounded-b-[1.75rem]"
                          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
                        />
                        {/* Placeholder content */}
                        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6">
                          <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em] text-center">
                            AI Skills
                          </p>
                          <p className="text-white/20 text-[10px] font-mono text-center leading-relaxed">
                            Coming soon
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Career Skills Panel — floats on the right inside the Skills modal */}
                  <AnimatePresence>
                    {selectedItem.id === 'skills' && isCareerPanelOpen && (
                      <motion.div
                        key="career-panel"
                        initial={{ opacity: 0, x: 32, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 32, scale: 0.97 }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 28,
                          mass: 0.9,
                          opacity: { duration: 0.25 },
                        }}
                        className="absolute right-6 top-6 bottom-6 w-[38%] z-20 rounded-[1.75rem] overflow-hidden"
                        style={{
                          background: 'rgba(34,211,238,0.06)',
                          backdropFilter: 'blur(32px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                          border: '1px solid rgba(34,211,238,0.3)',
                          boxShadow: 'inset 0 1px 0 rgba(34,211,238,0.35), inset 0 -1px 0 rgba(34,211,238,0.08), 0 0 0 1px rgba(34,211,238,0.06), 0 24px 48px rgba(0,0,0,0.25)',
                          willChange: 'transform, opacity',
                        } as React.CSSProperties}
                      >
                        {/* Top glare — cyan tinted */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none rounded-t-[1.75rem]"
                          style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.04) 60%, transparent 100%)' }}
                        />
                        {/* Bottom soft reflection */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none rounded-b-[1.75rem]"
                          style={{ background: 'linear-gradient(to top, rgba(34,211,238,0.08) 0%, transparent 100%)' }}
                        />
                        {/* Placeholder content */}
                        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6">
                          <p className="text-cyan-400/60 text-xs font-mono uppercase tracking-[0.2em] text-center">
                            Career
                          </p>
                          <p className="text-white/20 text-[10px] font-mono text-center leading-relaxed">
                            Coming soon
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav indicators */}
      <AnimatePresence>
        {!selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20"
          >
            <button
              id="nav-prev"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-3 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 backdrop-blur-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2.5">
              {ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  id={`nav-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>

            <button
              id="nav-next"
              onClick={handleNext}
              disabled={activeIndex === ITEMS.length - 1}
              className="p-3 rounded-full bg-white/5 hover:bg-white/12 border border-white/10 backdrop-blur-md disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
