import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const WORDS = ['Individual Therapy', '✦', 'Couples Healing', '◦', 'Trauma Recovery', '∞', 'Children & Teens', '△', 'Safe Space', '✦', 'Evidence-Based', '◦', 'Compassionate Care', '∞'];

function MarqueeStrip({ color = '#C4B5FD', bg = 'rgba(196,181,253,0.04)' }) {
  const shouldReduceMotion = useReducedMotion();
  const doubled = [...WORDS, ...WORDS];
  return (
    <div style={{ overflow: 'hidden', background: bg, borderTop: '1px solid rgba(196,181,253,0.07)', borderBottom: '1px solid rgba(196,181,253,0.07)', padding: '14px 0' }}>
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '36px', whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {(shouldReduceMotion ? WORDS : doubled).map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: word.startsWith('✦') || word.startsWith('◦') || word.startsWith('∞') || word.startsWith('△')
                ? 'rgba(134,239,172,0.45)'
                : `${color}60`,
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export { MarqueeStrip };

export default MarqueeStrip;