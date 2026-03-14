import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function FooterCTA({ onBookClick }) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { threshold: 0.2, once: true });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!isInView || !contentRef.current) return undefined;

    if (shouldReduceMotion) {
      const nodes = contentRef.current.querySelectorAll('[data-footer-reveal]');
      nodes.forEach((node) => {
        node.style.opacity = '1';
        node.style.transform = 'none';
      });
      return undefined;
    }

    const nodes = contentRef.current.querySelectorAll('[data-footer-reveal]');
    const animation = animate(nodes, {
      translateY: [26, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 720,
      ease: 'out(3)',
    });

    return () => animation?.revert?.();
  }, [isInView, shouldReduceMotion]);

  return (
    <section
      ref={ref}
      data-bg="#0D0720"
      style={{
        padding: '100px 24px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}
    >
      {/* Sunrise gradient */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(217,119,6,0.06), rgba(124,58,237,0.04), transparent)', pointerEvents: 'none' }} />
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.09), transparent 65%)', bottom: '-420px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(60px)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [-14, 14, -14], y: [-6, 6, -6] }}
        transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.07), transparent 70%)', bottom: '12%', right: '12%', filter: 'blur(50px)', pointerEvents: 'none' }}
      />

      <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>

      <motion.p
        data-footer-reveal
        style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', color: 'rgba(196,181,253,0.35)', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 600 }}
      >
        Your Healing Awaits
      </motion.p>

      <motion.button
        onClick={onBookClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-footer-reveal
        whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.6rem, 6.5vw, 5rem)',
          fontWeight: 700,
          color: hovered ? '#86EFAC' : '#C4B5FD',
          letterSpacing: '-0.02em',
          background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'center', lineHeight: 1.15,
          padding: '16px 24px',
          transition: 'color 0.4s ease',
          outline: 'none', position: 'relative', zIndex: 1,
        }}
        onFocus={(e) => { e.currentTarget.style.outline = '2px solid #C4B5FD'; e.currentTarget.style.outlineOffset = '8px'; }}
        onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
      >
        Shall we begin?
      </motion.button>

      {/* Animated underline on hover */}
      <motion.div
        animate={shouldReduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        style={{ height: 2, width: 280, background: 'linear-gradient(to right, transparent, #86EFAC, transparent)', borderRadius: 2, transformOrigin: 'center', marginTop: '-4px', marginBottom: '1.8rem', position: 'relative', zIndex: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
      />

      <motion.p
        data-footer-reveal
        style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', color: 'rgba(196,181,253,0.3)', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}
      >
        Available Mon–Fri · First consultation is complimentary
      </motion.p>

      {/* Footer bar */}
      <motion.div
        data-footer-reveal
        style={{
          marginTop: '3.5rem',
          display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center',
          fontFamily: 'Manrope, sans-serif', fontSize: '0.7rem',
          color: 'rgba(196,181,253,0.18)', position: 'relative', zIndex: 1,
        }}
      >
        <span>© 2026 Thamar Nissi</span>
        <span>·</span>
        <span>All sessions are strictly confidential</span>
        <span>·</span>
        <span>Healing through connection</span>
      </motion.div>
      </div>
    </section>
  );
}