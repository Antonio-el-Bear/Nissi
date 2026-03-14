import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/routes.js';
import { practiceHighlights } from '../data/siteContent.js';
import therapistPortrait from '../../ThamarNissi.jpeg';

const APPROACH = [
  { symbol: '◦', title: 'Unconditional Compassion', desc: 'Every session begins with deep respect for your unique journey — no judgment, no rush, no agenda but yours.', color: '#C4B5FD' },
  { symbol: '△', title: 'Evidence-Based Care', desc: 'Grounded in CBT, EMDR, attachment theory, and somatic practices — tools that work, tailored to you.', color: '#86EFAC' },
  { symbol: '∞', title: 'Cultural Sensitivity', desc: 'Your cultural identity, values, and lived experience are not side notes — they are central to your healing.', color: '#FDE68A' },
  { symbol: '✦', title: 'Your Pace, Always', desc: 'There is no timeline for healing. We move at the speed of trust, going only as deep as you are ready to go.', color: '#E9D5FF' },
];

function FadeSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });

  return (
    <div style={{
      background: 'linear-gradient(160deg, #1A0F2E 0%, #0F1E30 60%, #1A0F2E 100%)',
      minHeight: '100vh',
      paddingBottom: '130px',
      overflowX: 'hidden',
    }}>
      {/* Fixed ambient orbs */}
      <div style={{ position: 'fixed', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -200, left: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.12), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero section */}
      <section
        ref={heroRef}
        style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', padding: '120px 24px 60px', position: 'relative', zIndex: 1 }}
      >
        <div className="max-w-5xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center', width: '100%' }}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', letterSpacing: '0.22em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              About
            </p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '2rem' }}>
              Tamar<br />Nissi
            </h1>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', color: 'rgba(253,248,240,0.68)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              I became a therapist because I believe that healing is the most courageous act a person can choose. My practice is rooted in warmth, science, and a deep respect for the complexity of human experience.
            </p>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', color: 'rgba(253,248,240,0.55)', lineHeight: 1.85 }}>
              With specialized training in trauma-informed care, child and adolescent psychology, and couples therapy, I work with a wide range of people — from children navigating school pressures to adults healing from deep wounds, to couples finding their way back to each other.
            </p>
            <div className="detail-chip-row" style={{ marginTop: '1.8rem' }}>
              {practiceHighlights.map((item) => (
                <span key={item} className="detail-chip">{item}</span>
              ))}
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(196,181,253,0.12)', position: 'relative' }}>
              <img
                src={therapistPortrait}
                alt="Tamar Nissi, therapist"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) saturate(0.65)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(45,27,78,0.55), transparent 50%)' }} />
            </div>
            <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)', filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none' }} />
          </motion.div>
        </div>
      </section>

      {/* Approach / values */}
      <section style={{ padding: '60px 24px 40px', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#E9D5FF', textAlign: 'center', marginBottom: '4rem' }}>
              My Approach
            </h2>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
            {APPROACH.map((item, i) => (
              <FadeSection key={item.title} delay={i * 0.12}>
                <div className="glass-card" style={{ padding: '36px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.5rem', color: item.color }}>{item.symbol}</span>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', fontWeight: 700, color: item.color, margin: 0 }}>{item.title}</h3>
                  </div>
                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1rem', color: 'rgba(253,248,240,0.6)', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection delay={0.5}>
            <div className="editorial-panel" style={{ textAlign: 'center', marginTop: '4rem', maxWidth: '760px', marginInline: 'auto' }}>
              <p className="section-kicker">Care Philosophy</p>
              <p style={{ margin: '0 0 1.6rem', color: 'rgba(253,248,240,0.68)', fontSize: '1.02rem' }}>
                Healing work should feel structured enough to be safe and human enough to feel like relief. The practice balances research-backed tools with gentleness, pacing, and trust.
              </p>
              <button onClick={() => navigate(createPageUrl('Book'))} className="cta-button">
                Begin with Tamar
              </button>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}