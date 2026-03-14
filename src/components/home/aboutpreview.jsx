import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import therapistPortrait from '../../../ThamarNissi.jpeg';

const PILLARS = [
  { symbol: '◦', text: 'Cognitive Behavioral Therapy', color: '#C4B5FD' },
  { symbol: '△', text: 'Trauma-Informed Care (EMDR)', color: '#86EFAC' },
  { symbol: '∞', text: 'Attachment Theory', color: '#FDE68A' },
  { symbol: '✦', text: 'Somatic Practices', color: '#E9D5FF' },
];

export default function AboutPreview({ onLearnMore, onBlogClick }) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { threshold: 0.15, once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.08, 0.96]);
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

  useEffect(() => {
    if (!isInView || !contentRef.current) return undefined;

    if (shouldReduceMotion) {
      const revealNodes = contentRef.current.querySelectorAll('[data-about-reveal]');
      revealNodes.forEach((node) => {
        node.style.opacity = '1';
        node.style.transform = 'none';
        node.style.filter = 'none';
      });
      return undefined;
    }

    const revealNodes = contentRef.current.querySelectorAll('[data-about-reveal]');
    const animation = animate(revealNodes, {
      translateY: [30, 0],
      opacity: [0, 1],
      blur: ['10px', '0px'],
      delay: stagger(90, { start: 120 }),
      duration: 780,
      ease: 'out(3)',
    });

    return () => animation?.revert?.();
  }, [isInView, shouldReduceMotion]);

  return (
    <section
      ref={ref}
      data-bg="#1A0F2E"
      style={{ padding: '72px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(134,239,172,0.07), transparent 70%)', top: '-10%', right: '0%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>

        {/* Portrait */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -50, scale: 0.94 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(196,181,253,0.1)', aspectRatio: '3/4', position: 'relative' }}>
            <motion.img
              src={therapistPortrait}
              alt="Thamar Nissi"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) saturate(0.6)', scale: imgScale, y: imgY }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,46,0.6) 0%, transparent 50%)' }} />
            {/* Quote bubble */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.88 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.8, duration: 0.9 }}
              style={{
                position: 'absolute', bottom: 24, left: 20, right: 20,
                background: 'rgba(26,15,46,0.75)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(196,181,253,0.15)',
                borderRadius: '16px', padding: '16px 18px',
              }}
            >
              <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.92rem', color: '#C4B5FD', lineHeight: 1.55, margin: 0 }}>
                "Healing begins the moment you allow yourself to be truly seen."
              </p>
            </motion.div>
          </div>
          {/* Glow */}
          <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)', filter: 'blur(36px)', zIndex: -1, pointerEvents: 'none' }} />
        </motion.div>

        {/* Text + pillars */}
        <motion.div
          ref={contentRef}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            data-about-reveal
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', letterSpacing: '0.22em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}
          >
            Meet Your Guide
          </motion.p>

          <h2 data-about-reveal style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.4rem' }}>
            Thamar Nissi
          </h2>

          <p data-about-reveal style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.6)', lineHeight: 1.85, marginBottom: '2rem' }}>
            A licensed therapist with a warm, evidence-based approach. Thamar believes healing begins when we feel truly seen and safe — drawing from decades of clinical experience to create space for real transformation.
          </p>

          {/* Approach pillars */}
          <div data-about-reveal style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.4rem' }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.text}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 + i * 0.08, duration: 0.7 }}
                whileHover={shouldReduceMotion ? undefined : { x: 6 }}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(196,181,253,0.04)', border: '1px solid rgba(196,181,253,0.08)', cursor: 'default' }}
              >
                <span style={{ fontSize: '1.1rem', color: p.color, flexShrink: 0 }}>{p.symbol}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', color: 'rgba(253,248,240,0.65)', fontWeight: 500 }}>{p.text}</span>
              </motion.div>
            ))}
          </div>

          <div data-about-reveal style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <motion.button
              onClick={onLearnMore}
              className="cta-button-outline"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Read My Story
            </motion.button>
            <motion.button
              onClick={onBlogClick}
              className="cta-button"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              The Journal
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}