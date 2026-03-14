import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ENCOURAGEMENT_PATHS = [
  {
    id: 'breathe',
    label: 'Breathe',
    kicker: 'Regulate',
    headline: 'You do not have to hold this season all by yourself.',
    body: 'Begin with one breath, one honest moment, one softer decision. Support can meet you there without urgency.',
    accent: '#86EFAC',
    glow: 'rgba(134,239,172,0.24)',
    chips: ['Slow down', 'Feel safe', 'Start small'],
  },
  {
    id: 'steady',
    label: 'Steady',
    kicker: 'Containment',
    headline: 'Healing can feel exquisitely gentle and still be deeply effective.',
    body: 'This practice is designed to lower the noise, soften the pressure, and help you feel held in a calm, private therapeutic space.',
    accent: '#C4B5FD',
    glow: 'rgba(196,181,253,0.24)',
    chips: ['Private support', 'No pressure', 'Clear next step'],
  },
  {
    id: 'begin',
    label: 'Begin',
    kicker: 'Next Chapter',
    headline: 'A steadier future can begin before you feel fully ready.',
    body: 'If today is the day you reach for firmer ground, the booking experience is built to feel calm, clear, and reassuring from the first click.',
    accent: '#F7C977',
    glow: 'rgba(247,201,119,0.24)',
    chips: ['Book softly', '30-minute consult', 'Response within 24 hours'],
  },
];

const CONSOLE_MESSAGES = [
  'You are safe to begin slowly.',
  'Nothing about this has to be performed.',
  'There is room for softness here.',
];

export default function HeroSection({ onBookClick }) {
  const shouldReduceMotion = useReducedMotion();
  const [activePathId, setActivePathId] = useState(ENCOURAGEMENT_PATHS[0].id);
  const activePath = ENCOURAGEMENT_PATHS.find((path) => path.id === activePathId) || ENCOURAGEMENT_PATHS[0];

  return (
    <section
      data-bg="#1A0F2E"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: '110px 24px 72px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 18%, rgba(124,58,237,0.18), transparent 30%), radial-gradient(circle at 82% 24%, rgba(134,239,172,0.12), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 58%)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)',
          top: '-160px',
          left: '-120px',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(134,239,172,0.14), transparent 70%)',
          bottom: '-140px',
          right: '-120px',
          filter: 'blur(72px)',
          pointerEvents: 'none',
        }}
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.75, 0.95, 0.75] }}
        transition={shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      <div className="max-w-6xl mx-auto" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '42px', alignItems: 'center' }}>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', letterSpacing: '0.24em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
              Private Therapeutic Space
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(4rem, 11vw, 8rem)', fontWeight: 900, color: '#E9D5FF', letterSpacing: '-0.04em', lineHeight: 0.96, margin: '0 0 1rem' }}>
              Thamar<br />Nissi
            </h1>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)', fontStyle: 'italic', color: '#A7F3D0', margin: '0 0 1.1rem' }}>
              Find steadier ground, one considered step at a time.
            </p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.02rem', color: 'rgba(252,246,238,0.68)', lineHeight: 1.85, maxWidth: '34rem', marginBottom: '2rem' }}>
              A calm digital sanctuary for people moving through heavy seasons. Every part of the experience is designed to feel safe, immersive, and quietly encouraging from first impression to first booking.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
              <motion.button
                onClick={onBookClick}
                className="cta-button"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Reserve My Safe First Step
              </motion.button>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0.95rem 1.1rem', borderRadius: '999px', border: '1px solid rgba(196,181,253,0.14)', background: 'rgba(255,255,255,0.03)', color: 'rgba(252,246,238,0.72)', fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: activePath.accent, boxShadow: `0 0 18px ${activePath.glow}` }} />
                Complimentary 30-minute consult
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {activePath.chips.map((chip) => (
                <span key={chip} style={{ padding: '0.55rem 0.85rem', borderRadius: '999px', border: '1px solid rgba(196,181,253,0.1)', background: 'rgba(255,255,255,0.03)', color: 'rgba(252,246,238,0.7)', fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem' }}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'relative', borderRadius: '32px', border: '1px solid rgba(196,181,253,0.14)', background: 'linear-gradient(160deg, rgba(16,9,30,0.9), rgba(28,18,51,0.78))', boxShadow: '0 26px 80px rgba(5, 3, 14, 0.42)', padding: '26px', overflow: 'hidden' }}>
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-10%',
                  right: '-6%',
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${activePath.glow}, transparent 68%)`,
                  filter: 'blur(20px)',
                }}
                animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                <div>
                  <p style={{ margin: '0 0 0.35rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: activePath.accent, fontWeight: 700 }}>
                    {activePath.kicker}
                  </p>
                  <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F8F2FF', lineHeight: 1.08 }}>
                    {activePath.headline}
                  </h2>
                </div>
                <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
                  {!shouldReduceMotion && [0, 1].map((ring) => (
                    <motion.div
                      key={ring}
                      style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${activePath.accent}55` }}
                      animate={{ scale: [1, 1.65], opacity: [0.34, 0] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: ring * 1.6 }}
                    />
                  ))}
                  <motion.div
                    style={{ position: 'absolute', inset: 14, borderRadius: '50%', background: `radial-gradient(circle, ${activePath.accent}, rgba(255,255,255,0.12))`, boxShadow: `0 0 36px ${activePath.glow}` }}
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                    transition={shouldReduceMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              <p style={{ position: 'relative', zIndex: 1, margin: '0 0 1.2rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.98rem', lineHeight: 1.8, color: 'rgba(252,246,238,0.72)' }}>
                {activePath.body}
              </p>

              <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: '12px', marginBottom: '18px' }}>
                {CONSOLE_MESSAGES.map((message, index) => (
                  <div key={message} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'start', padding: '0.9rem 1rem', borderRadius: '18px', background: index === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,181,253,0.08)' }}>
                    <span style={{ width: 8, height: 8, marginTop: '0.45rem', borderRadius: '50%', background: activePath.accent, boxShadow: `0 0 12px ${activePath.glow}` }} />
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.92rem', color: 'rgba(252,246,238,0.72)', lineHeight: 1.7 }}>{message}</span>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
                {ENCOURAGEMENT_PATHS.map((path) => {
                  const isActive = path.id === activePath.id;
                  return (
                    <button
                      key={path.id}
                      type="button"
                      onMouseEnter={() => setActivePathId(path.id)}
                      onFocus={() => setActivePathId(path.id)}
                      onClick={() => setActivePathId(path.id)}
                      style={{
                        borderRadius: '18px',
                        border: `1px solid ${isActive ? `${path.accent}66` : 'rgba(196,181,253,0.08)'}`,
                        background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                        color: isActive ? '#FCF6EE' : 'rgba(252,246,238,0.7)',
                        padding: '0.95rem 0.85rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.45rem' }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: path.accent, boxShadow: `0 0 12px ${path.glow}` }} />
                        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.88rem', fontWeight: 700 }}>{path.label}</span>
                      </div>
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.76rem', lineHeight: 1.5, color: isActive ? 'rgba(252,246,238,0.82)' : 'rgba(252,246,238,0.54)' }}>
                        {path.chips[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}