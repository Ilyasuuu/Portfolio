'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'motion/react';

// Static Imports for GitHub Pages
import portrait from '../public/IMG_3651.PNG';
import sillyMe from '../public/SillyMe.png';

type Item = {
  id: string;
  cardGradient?: string;
  cardShadow?: string;
  overlayGradient?: string;
};

interface GlassIdentityCardProps {
  items?: Item[];
  activeIndex?: number;
}

export default function GlassIdentityCard({ items = [], activeIndex = 0 }: GlassIdentityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Dynamic glare position based on mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      // GPU-safe entrance: only opacity+scale — no animated filter:blur (causes per-frame repaints)
      initial={{ opacity: 0, scale: 0.85, rotateX: 20, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full perspective-[1200px]"
    >
      <motion.div
        className="relative w-full aspect-[4/5]"
        animate={{
          y: [-12, 12, -12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' } as React.CSSProperties}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            rotateX: isFlipped ? 0 : rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            touchAction: 'none',
          } as React.CSSProperties}
          animate={{
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-full relative rounded-3xl cursor-pointer pointer-events-auto select-none"
        >
          {/* FRONT FACE */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              zIndex: isFlipped ? 0 : 1 
            }}
          >
            {/* Dynamic Aura Sync Backgrounds */}
            <AnimatePresence>
              {items.map((item, index) => {
                if (index !== activeIndex) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.cardGradient || 'from-cyan-300/50 via-white/10 to-purple-500/50'} ${item.cardShadow || 'shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.2)]'}`}
                  />
                );
              })}
            </AnimatePresence>

            {/* Default fallback if no items */}
            {items.length === 0 && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-300/50 via-white/10 to-purple-500/50 shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.2)]" />
            )}

            {/* Inner Glass Block */}
            <div 
              className="w-full h-full rounded-[22px] bg-black/15 backdrop-blur-xl relative shadow-[inset_0_0_40px_rgba(255,255,255,0.08)] border border-white/20 p-[2px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Cybernetic Grid Overlay */}
              <div 
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-[22px]" 
                style={{ transform: "translateZ(10px)" }}
              />

              {/* Floating Image Container (Pushed out in 3D space) */}
              <div className="absolute inset-0 p-5" style={{ transform: "translateZ(40px)" }}>
                <div className="relative w-full h-full rounded-[16px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-black/40 border border-white/20">
                  <Image
                    src={portrait}
                    alt="Identity Portrait"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover opacity-95"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                  
                  {/* Holographic overlay ON TOP of the image - synced with active item */}
                  <AnimatePresence>
                    {items.map((item, index) => {
                      if (index !== activeIndex) return null;
                      return (
                        <motion.div
                          key={`overlay-${item.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className={`absolute inset-0 bg-gradient-to-tr ${item.overlayGradient || 'from-cyan-500/20 via-transparent to-fuchsia-500/20'} mix-blend-overlay pointer-events-none`}
                        />
                      );
                    })}
                  </AnimatePresence>

                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.4)] rounded-[16px] pointer-events-none" />
                </div>
              </div>
              
              {/* Dynamic Glare Effect (Moves with mouse, floats highest in Z-space) */}
              <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80 rounded-[22px]"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={{
                  background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, transparent 60%)`,
                  translateZ: 60,
                } as unknown as React.CSSProperties}
              />
              
              {/* Static Glass Reflections */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-60 pointer-events-none rounded-t-[22px]" 
                style={{ transform: "translateZ(50px)" }} 
              />
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cyan-400/20 to-transparent opacity-40 pointer-events-none rounded-b-[22px]" 
                style={{ transform: "translateZ(50px)" }} 
              />


            </div>
          </div>

          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
              zIndex: isFlipped ? 1 : 0
            }}
          >
            <div className="w-full h-full bg-black/20 relative border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sillyMe}
                alt="Silly Mode"
                width={400}
                height={500}
                className="w-full h-full object-cover"
                unoptimized
              />
              {/* Removed blur and white overlay for perfect clarity */}
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] pointer-events-none" />
              
              {/* Back-side label */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center" style={{ transform: 'translateZ(20px)' }}>
                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Silly Mode Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
