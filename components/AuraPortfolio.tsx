'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X as CloseIcon, ChevronLeft, ChevronRight, Mail, Linkedin, Copy, Check } from 'lucide-react';
import GlassIdentityCard from './GlassIdentityCard';
import DustParticles from './DustParticles';
import Planet from './Planet';
import { getImagePath } from '@/lib/utils';

const ITEMS = [
  {
    id: 'about',
    title: 'About',
    subtitle: 'The Builder',
    content: 'I am a Business Management student at Vilnius University and currently a Sourcing Operations Intern at Mediq. I am a builder at heart. While I work in business operations by day, I spend my time diving deep into AI. I love the process of taking an idea from zero to a finished project. My goal is to stay ahead of the curve, constantly improving my skills.',
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
];

const PROJECTS_DATA = [
  {
    id: 'fintech-ops-dashboard',
    marker: '— PROJECT 1',
    title: 'Fintech Operations & SLA Dashboard',
    tagline: 'Designed and deployed an automated Excel-based tracking system to manage cross-border payment queries, AML Requests for Information (RFIs), and client account updates.',
    tags: ['Microsoft Excel', 'Fintech Ops'],
    color: 'from-blue-500 to-emerald-500',
    media: getImagePath('/tracking_system_sheet1.png'),
    media2: getImagePath('/tracking_system_sheet2.png'),
    mediaPlaceholder: '[INSERT EXCEL DATA TABLE SCREENSHOT HERE]',
    mediaPlaceholder2: '[INSERT PIVOT CHART SCREENSHOT HERE]',
    body1: {
      objective: '🎯 The Business Objective\n\nIn fast-paced fintech and banking environments, Junior Relationship Managers handle a high volume of unstructured, time-sensitive client requests across multiple departments (Compliance, Payments, FX).\n\nThe objective of this project was to build a robust system to:\n• Track the exact lifecycle and status of client operational requests.\n• Ensure critical compliance tasks (like AML RFIs and KYC Refreshes) do not breach deadlines.\n• Provide a clear, visual daily task pipeline to prioritize client outreach.',
      phase1: '📊 Phase 1: The SLA Tracking Matrix\n\nTo begin, I engineered a mock dataset reflecting a typical week of global EMI (Electronic Money Institution) operations, including multi-currency transactions (EUR, USD, GBP, CNY) and multi-lingual client profiles.\n\nI ingested the raw comma-separated data, structured it using Excel\'s Text-to-Columns functionality, and converted it into a dynamic data table. I then applied traffic-light Conditional Formatting to the SLA deadlines to instantly alert the Relationship Manager of tasks requiring immediate attention.'
    },
    body2: {
      phase2: '📈 Phase 2: The Daily Triage Dashboard\n\nManaging raw data is only half the battle; the team needs actionable insights. I built a dynamic PivotTable to aggregate the open tickets by their current Status.\n\nI then layered a clean, optimized PivotChart over this data, sorted from largest to smallest. This creates an instant "Daily Triage" view. A Relationship Manager can open this dashboard at 9:00 AM and immediately see that their biggest bottleneck is tasks "Awaiting Client" responses, prompting them to prioritize follow-up calls or emails right away.',
      impact: '💡 Business Impact & Application\n\nThis Proof of Concept demonstrates the exact skills required for high-performing operational roles in banking and financial services:\n\n• Attention to Detail: Structuring messy, raw data into a clean, trackable format.\n• Task Management: Visually prioritizing multiple time-sensitive requests.\n• IT/Tool Proficiency: Pushing beyond basic data entry to utilize MS Office as a true business intelligence tool.'
    }
  },
];

const ModernX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function AuraPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
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
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

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
                  { amp: 22, freq: 1.0, phase: 0.8, opacity: 0.75, width: 1.0, dash: 80, gap: 40, speed: 3.8 },
                  { amp: 25, freq: 0.7, phase: 0.1, opacity: 0.55, width: 1.8, dash: 220, gap: 30, speed: 5 },
                  { amp: 32, freq: 0.8, phase: 0.3, opacity: 0.90, width: 0.6, dash: 140, gap: 60, speed: 2.8 },
                  { amp: 8, freq: 1.2, phase: 0.5, opacity: 0.80, width: 0.4, dash: 90, gap: 30, speed: 2.5 },
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
          <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
            <div ref={identityCardRef} className="pointer-events-auto w-full">
              <GlassIdentityCard items={ITEMS} activeIndex={activeIndex} />
            </div>

            {/* "Do Not Click" — Holographic Warning Label below the card */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.04, 1],
                y: [0, -3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 pointer-events-none select-none"
            >
              {/* Pixel-art upward arrow */}
              <svg width="20" height="20" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.9))' }}>
                <path d="M2 4H3V3H4V2H5V1H4V2H3V1H2V2H1V1H0V2H1V3H2V4Z" fill="#ef4444" />
              </svg>
              <span
                className="font-mono text-xs font-black uppercase tracking-[0.35em] text-red-500 text-center"
                style={{ textShadow: '0 0 14px rgba(239,68,68,1), 0 0 30px rgba(239,68,68,0.5), 0 0 4px rgba(255,255,255,0.4)' }}
              >
                Do&nbsp;Not&nbsp;Click
              </span>
            </motion.div>
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
                  <div className={`relative z-10 flex flex-col h-full ${selectedItem.id === 'projects' ? 'p-0' : 'p-8 sm:p-16 md:p-20'} w-full hide-scrollbar ${selectedItem.id === 'about' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                    <div className={
                      selectedItem.id === 'skills'
                        ? 'w-full flex flex-col items-center text-center'
                        : selectedItem.id === 'projects'
                          ? 'w-full h-full flex flex-row'
                          : selectedItem.id === 'about'
                            ? 'w-full h-full'
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
                                href="https://x.com/ilyas8_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-110"
                              >
                                <ModernX className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
                              </a>
                            </div>

                            {/* LinkedIn Orb */}
                            <div className="absolute top-0 right-0 sm:right-4 pointer-events-auto">
                              <a
                                href="https://www.linkedin.com/in/ilyas-el-bourari-3615a524a"
                                target="_blank"
                                rel="noopener noreferrer"
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
                                      elbourari11@gmail.com
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText("elbourari11@gmail.com");
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
                            <div className="w-[70%] flex flex-col h-full overflow-hidden relative" style={{ contain: 'layout', transform: 'translateZ(0)' } as React.CSSProperties}>
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeProjectIdx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                  className="w-full h-full flex flex-col p-12 sm:p-20 overflow-y-auto project-scroll gpu-scroll-layer"
                                >
                                  <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-1 px-3 bg-gradient-to-r ${PROJECTS_DATA[activeProjectIdx].color} rounded-full`} />
                                    <span className="text-white/40 font-mono text-sm tracking-[0.2em] uppercase">
                                      {PROJECTS_DATA[activeProjectIdx].marker || `Project ${activeProjectIdx + 1}`}
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

                                  <div className="prose prose-invert prose-lg max-w-none">
                                    <div className="mb-12 whitespace-pre-wrap text-white/70 leading-relaxed text-lg">
                                      {/* Objective Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body1?.objective?.split('\n\n')[0]}
                                      </h3>
                                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
                                        <p className="mb-0">{PROJECTS_DATA[activeProjectIdx].body1?.objective?.split('\n\n').slice(1).join('\n\n')}</p>
                                      </div>

                                      {/* Phase 1 Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body1?.phase1?.split('\n\n')[0]}
                                      </h3>
                                      <p className="mb-8">{PROJECTS_DATA[activeProjectIdx].body1?.phase1?.split('\n\n').slice(1).join('\n\n')}</p>

                                      {/* Sheet 1 Image */}
                                      <div className="flex justify-center mb-16">
                                        <div
                                          onClick={() => setExpandedImage(PROJECTS_DATA[activeProjectIdx].media)}
                                          className="relative w-[70%] aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl flex items-center justify-center group cursor-zoom-in"
                                        >
                                          {PROJECTS_DATA[activeProjectIdx].media ? (
                                            <Image
                                              src={PROJECTS_DATA[activeProjectIdx].media}
                                              alt="SLA Tracking Matrix"
                                              width={1600}
                                              height={900}
                                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                              unoptimized
                                            />
                                          ) : (
                                            <p className="text-white/20 font-mono text-sm uppercase tracking-widest px-8 text-center">
                                              {PROJECTS_DATA[activeProjectIdx].mediaPlaceholder}
                                            </p>
                                          )}
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                      </div>

                                      {/* Phase 2 Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body2?.phase2?.split('\n\n')[0]}
                                      </h3>
                                      <p className="mb-8">{PROJECTS_DATA[activeProjectIdx].body2?.phase2?.split('\n\n').slice(1).join('\n\n')}</p>

                                      {/* Sheet 2 Image */}
                                      <div className="flex justify-center mb-16">
                                        <div
                                          onClick={() => setExpandedImage(PROJECTS_DATA[activeProjectIdx].media2)}
                                          className="relative w-[70%] aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl flex items-center justify-center group cursor-zoom-in"
                                        >
                                          {PROJECTS_DATA[activeProjectIdx].media2 ? (
                                            <Image
                                              src={PROJECTS_DATA[activeProjectIdx].media2}
                                              alt="Daily Triage Dashboard"
                                              width={1600}
                                              height={900}
                                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                              unoptimized
                                            />
                                          ) : (
                                            <p className="text-white/20 font-mono text-sm uppercase tracking-widest px-8 text-center">
                                              {PROJECTS_DATA[activeProjectIdx].mediaPlaceholder2}
                                            </p>
                                          )}
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                      </div>

                                      {/* Impact Section */}
                                      <h3 className="text-white text-3xl font-display mb-6">
                                        {PROJECTS_DATA[activeProjectIdx].body2?.impact?.split('\n\n')[0]}
                                      </h3>
                                      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-8 mb-20">
                                        <p className="mb-0">{PROJECTS_DATA[activeProjectIdx].body2?.impact?.split('\n\n').slice(1).join('\n\n')}</p>
                                      </div>
                                    </div>
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
                              className="hidden md:flex w-[30%] flex-col p-8 pt-24 h-full overflow-y-auto gpu-scroll-layer shrink-0 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.2)] gap-4"
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
                                    {project.id === 'fintech-ops-dashboard' ? 'Fintech Ops Dashboard' : project.tagline}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : selectedItem.id === 'about' ? (
                          <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 w-full h-full overflow-hidden">

                            {/* ── Left: Bio ── */}
                            <div className="relative flex-1 min-w-[300px] flex flex-col justify-center">
                              <div className="relative flex flex-col gap-8">
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.38, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I am a Business Management student at{' '}
                                  <span className="text-white font-medium">Vilnius University</span>{' '}
                                  and currently a{' '}
                                  <span
                                    className="font-bold text-white"
                                    style={{ textShadow: '0 0 18px rgba(255,255,255,0.55), 0 0 6px rgba(255,255,255,0.3)' }}
                                  >
                                    Sourcing Operations Intern at Mediq
                                  </span>
                                  .
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.58, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I am a{' '}
                                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    builder at heart
                                  </span>
                                  . While I work in business operations by day, I spend my time diving deep into{' '}
                                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                    AI
                                  </span>
                                  .
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.78, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                  className="text-slate-200 text-base sm:text-xl leading-relaxed font-light"
                                >
                                  I love the process of taking an idea from zero to a finished project. My goal is to stay ahead of the curve, constantly improving my skills.
                                </motion.p>
                              </div>
                            </div>

                            {/* ── Right: Card Cluster ── */}
                            <div className="flex flex-row items-stretch gap-4 shrink-0">
                              {/* ── Middle: Identity Card ── */}
                              <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="shrink-0 flex flex-col items-center justify-center w-[200px]"
                              >
                                <div className="relative w-full h-[400px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(255,255,255,0.02)]">
                                  {/* Top glow accent */}
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                                  {/* Name block */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Name
                                    </span>
                                    <h3
                                      className="text-2xl font-display font-semibold text-white leading-tight"
                                      style={{ textShadow: '0 0 24px rgba(148,163,255,0.45)' }}
                                    >
                                      Ilyas<br />El Bourari
                                    </h3>
                                  </div>

                                  {/* Divider */}
                                  <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                                  {/* Location block */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Based in
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shrink-0"
                                        style={{ boxShadow: '0 0 8px rgba(96,165,250,0.9)' }}
                                      />
                                      <span className="text-slate-300 font-medium text-base tracking-wide">
                                        Vilnius
                                      </span>
                                    </div>
                                  </div>

                                  {/* Bottom glow accent */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                </div>
                              </motion.div>

                              {/* ── Right: Socials Card ── */}
                              <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="shrink-0 flex flex-col items-center justify-center w-[200px]"
                              >
                                <div className="relative w-full h-[400px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_0_30px_rgba(255,255,255,0.02)]">
                                  {/* Top glow accent */}
                                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                                  {/* Socials Headline */}
                                  <div className="flex flex-col items-center gap-1.5 text-center">
                                    <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/30 select-none">
                                      Socials
                                    </span>
                                  </div>

                                  {/* Vertical Socials List — Centered */}
                                  <div className="flex-1 flex flex-col items-center justify-center gap-10 w-full relative">
                                    <a href="https://x.com/ilyas8_" target="_blank" rel="noopener noreferrer" className="group">
                                      <ModernX className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/ilyas-el-bourari-3615a524a" target="_blank" rel="noopener noreferrer" className="group">
                                      <Linkedin className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                                    </a>

                                    <div className="relative">
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText('elbourari11@gmail.com');
                                          setHasCopied(true);
                                          setTimeout(() => setHasCopied(false), 2000);
                                        }}
                                        className="group relative"
                                      >
                                        <Mail className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
                                      </button>

                                      <AnimatePresence>
                                        {hasCopied && (
                                          <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md whitespace-nowrap"
                                          >
                                            <span className="text-[10px] text-white font-mono uppercase tracking-widest">
                                              Copied!
                                            </span>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>

                                  {/* Bottom glow accent */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                </div>
                              </motion.div>
                            </div>

                          </div>
                        ) : (
                          <div className="prose prose-invert prose-lg sm:prose-xl max-w-none">
                            <p className="text-slate-200 leading-relaxed text-xl sm:text-2xl font-light tracking-wide">
                              {selectedItem.content}
                            </p>
                          </div>
                        )}
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
                        {/* Content */}
                        <div className="relative h-full flex flex-col p-8 sm:p-10 hide-scrollbar overflow-y-auto gpu-scroll-layer">
                          <h3 className="text-cyan-400 font-display text-3xl mb-8 tracking-tight drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                            Career Portfolio
                          </h3>
                          
                          <div className="flex flex-col gap-10">
                            {/* Technical Skills */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                              <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-gradient-to-r from-cyan-400/80 to-transparent" />
                                <h4 className="text-white/90 font-mono text-sm uppercase tracking-[0.2em] font-medium">Technical Skills</h4>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  'Advanced Microsoft Excel (VLOOKUP, Pivot Tables, Pivot Charts, Macros, Dashboards)',
                                  'Python (scripting, data analysis, automation)',
                                  'SQL (database querying & management)',
                                  'No-code Tools: Make, Airtable',
                                  'ERP Systems (data entry, price management, system accuracy)',
                                  'Financial Data Analysis & Visualization',
                                  'Automated Dashboard Development',
                                  'Financial Modeling & Reporting',
                                  'Data Accuracy & Reconciliation'
                                ].map((skill, i) => (
                                  <li key={i} className="text-white/70 text-sm sm:text-base font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90">
                                    <span className="text-cyan-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">♦</span>
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                            
                            {/* AML / KYC / COMPLIANCE SKILLS */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                              <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-gradient-to-r from-cyan-400/80 to-transparent" />
                                <h4 className="text-white/90 font-mono text-sm uppercase tracking-[0.2em] font-medium">AML / KYC / Compliance</h4>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  'Customer Due Diligence (CDD) & Enhanced Due Diligence (EDD)',
                                  'Know Your Customer (KYC) onboarding processes',
                                  'Anti-Money Laundering (AML) typologies & red flag identification',
                                  'Sanctions screening awareness (OFAC, EU, UN lists)',
                                  'Transaction monitoring basics',
                                  'Regulatory frameworks: FATF guidelines, EU AML Directives',
                                  'Risk-based approach to client assessment',
                                  'Suspicious Activity Report (SAR) awareness',
                                  'PEP (Politically Exposed Persons) screening',
                                  'Document verification & identity checks'
                                ].map((skill, i) => (
                                  <li key={i} className="text-white/70 text-sm sm:text-base font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90">
                                    <span className="text-cyan-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">♦</span>
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>

                            {/* FINANCE / BANKING OPERATIONS */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                              <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-gradient-to-r from-cyan-400/80 to-transparent" />
                                <h4 className="text-white/90 font-mono text-sm uppercase tracking-[0.2em] font-medium">Finance & Banking Ops</h4>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  'Supplier pricing management & procurement data',
                                  'Cross-functional coordination (Data Management, Product Teams)',
                                  'Client documentation processing & compliance',
                                  'Financial reporting support',
                                  'Market research & competitive analysis',
                                  'Operational efficiency & process improvement',
                                  'Data integrity & audit trail maintenance'
                                ].map((skill, i) => (
                                  <li key={i} className="text-white/70 text-sm sm:text-base font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90">
                                    <span className="text-cyan-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">♦</span>
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>

                            {/* SOFT SKILLS */}
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                              <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-gradient-to-r from-cyan-400/80 to-transparent" />
                                <h4 className="text-white/90 font-mono text-sm uppercase tracking-[0.2em] font-medium">Soft Skills</h4>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  'Analytical problem-solving & critical thinking',
                                  'Attention to detail & documentation review',
                                  'Professional report drafting & presentation',
                                  'Cross-cultural communication (English, French, Arabic)',
                                  'Adaptability in fast-paced environments',
                                  'Client relationship management'
                                ].map((skill, i) => (
                                  <li key={i} className="text-white/70 text-sm sm:text-base font-light leading-relaxed flex items-start gap-3 transition-colors hover:text-white/90">
                                    <span className="text-cyan-400 mt-1.5 text-[10px] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">♦</span>
                                    <span>{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                            
                            {/* Bottom padding for scrolling within the glass panel */}
                            <div className="h-8 w-full shrink-0" />
                          </div>
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

      {/* Expanded Image Modal — High-end lightbox */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-20 backdrop-blur-[32px] bg-black/80"
            onClick={() => setExpandedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 sm:top-12 sm:right-12 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] z-[110]"
              onClick={() => setExpandedImage(null)}
            >
              <CloseIcon className="w-7 h-7 text-white" />
            </motion.button>

            {/* Expanded Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-[95vw] h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt="Expanded View"
                width={2048}
                height={1152}
                className="w-full h-full object-contain rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,1)] border border-white/10"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
