'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
        {/* Left — Identity Card */}
        <div className="w-full md:w-[30%] h-full flex items-center justify-center p-8 z-20 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[320px]">
            <GlassIdentityCard items={ITEMS} activeIndex={activeIndex} />
          </div>
        </div>

        {/* Right — Carousel — contain prevents carousel reflows leaking to the rest of the DOM */}
        <div
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
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
                        layout: { type: 'spring', stiffness: 190, damping: 26, mass: 1.1 },
                        opacity: { duration: 0.15, delay: isSelected ? 0.06 : 0.32 },
                      }}
                    >
                      <Planet color={item.planetColor} isSelected={false} />
                    </motion.div>
                  </div>
                </div>
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
                    isSkills
                      ? { opacity: 0, width: '55vw', height: '34.375vw', y: 40, scale: 0.95 }
                      : isProjects
                        ? { opacity: 0, width: '60vw', height: '33.75vw', y: 40, scale: 0.95 }
                        : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  animate={
                    isSkills
                      ? { opacity: 1, width: 'min(85vw, 1440px)', height: 'min(53.125vw, 85vh)', y: 0, scale: 1 }
                      : isProjects
                        ? { opacity: 1, width: 'min(92vw, 1600px)', height: 'min(51.75vw, 88vh)', y: 0, scale: 1 }
                        : { opacity: 1, scale: 1, y: 0 }
                  }
                  exit={
                    isSkills
                      ? { opacity: 0, width: '55vw', height: '34.375vw', y: 40, scale: 0.95 }
                      : isProjects
                        ? { opacity: 0, width: '60vw', height: '33.75vw', y: 40, scale: 0.95 }
                        : { opacity: 0, scale: 0.9, y: 30 }
                  }
                  transition={
                    isCinematic
                      ? {
                        width: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
                        height: { type: 'spring', stiffness: 260, damping: 32, mass: 1 },
                        scale: { type: 'spring', stiffness: 260, damping: 32 },
                        opacity: { duration: 0.25, ease: 'easeOut' },
                        y: { type: 'spring', stiffness: 300, damping: 30 },
                      }
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
                        maxWidth: '85vw',
                        maxHeight: '85vh',
                        aspectRatio: '16 / 10',
                        willChange: 'width, height, opacity, transform',
                      }
                      : isProjects
                        ? {
                          maxWidth: '92vw',
                          maxHeight: '88vh',
                          aspectRatio: '16 / 9',
                          willChange: 'width, height, opacity, transform',
                          transform: 'translateZ(0)',
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
                    transition={{ type: 'spring', stiffness: 190, damping: 26, mass: 1.1 }}
                  >
                    <Planet color={selectedItem.planetColor} />
                  </motion.div>

                  {/* Close */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.25 }}
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
                              className="hidden md:flex w-[30%] flex-col p-8 pt-24 backdrop-blur-[4px] h-full overflow-y-auto hide-scrollbar shrink-0 border-l border-white/5 shadow-[-20px_0_40px_rgba(0,0,0,0.2)] gap-4"
                              style={{ backgroundColor: `${selectedItem.planetColor}1c` }}
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
