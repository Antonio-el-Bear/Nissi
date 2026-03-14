import React, { useRef, useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const STATS = [
  { value: 500, suffix: '+', label: 'Lives Touched' },
  { value: 10, suffix: ' yrs', label: 'Experience' },
  { value: 4, suffix: '', label: 'Specialties' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

function Counter({ target, suffix, isInView, shouldReduceMotion }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(target);
      return undefined;
    }
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, shouldReduceMotion, target]);

  return <span>{count}{suffix}</span>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { threshold: 0.4, once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return undefined;

    if (shouldReduceMotion) {
      const statNodes = ref.current.querySelectorAll('[data-stat-item]');
      statNodes.forEach((node) => {
        node.style.opacity = '1';
        node.style.transform = 'none';
      });
      return undefined;
    }

    const statNodes = ref.current.querySelectorAll('[data-stat-item]');
    const animation = animate(statNodes, {
      translateY: [26, 0],
      opacity: [0, 1],
      scale: [0.96, 1],
      delay: stagger(85),
      duration: 700,
      ease: 'out(3)',
    });

    return () => animation?.revert?.();
  }, [isInView, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      style={{
        padding: '52px 24px',
        background: 'rgba(196,181,253,0.03)',
        borderTop: '1px solid rgba(196,181,253,0.07)',
        borderBottom: '1px solid rgba(196,181,253,0.07)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Soft center glow */}
      <div style={{
        position: 'absolute', width: 400, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div className="max-w-5xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            data-stat-item
          >
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
              fontWeight: 900, color: '#C4B5FD',
              letterSpacing: '-0.03em', lineHeight: 1,
              marginBottom: '0.4rem',
            }}>
              <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} shouldReduceMotion={shouldReduceMotion} />
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', letterSpacing: '0.18em', color: 'rgba(196,181,253,0.45)', textTransform: 'uppercase', fontWeight: 600 }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}