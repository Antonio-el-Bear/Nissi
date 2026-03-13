import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import therapistPortrait from '../../../ThamarNissi.jpeg';

const NAME_WORDS = ['Thamar', 'Nissi'];

const PARTICLES = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  size: Math.random() * 4 + 1.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 5 + Math.random() * 8,
  opacity: 0.08 + Math.random() * 0.18,
}));

const SERVICES = [
  {
    id: 'individual',
    bg: '#1E0B45',
    symbol: '◦',
    label: 'For You',
    title: 'Individual Therapy',
    description: 'A private, compassionate space to explore your inner world. Whether navigating anxiety, depression, life transitions, or seeking deeper self-understanding, this is your time.',
    color: '#C4B5FD',
    accent: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
  },
  {
    id: 'couples',
    bg: '#061F1F',
    symbol: '∞',
    label: 'For Two',
    title: 'Couples Therapy',
    description: 'Relationships need care. Together we rebuild trust, improve communication, and rediscover the bond that brought you together.',
    color: '#86EFAC',
    accent: '#0D9488',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
  },
  {
    id: 'trauma',
    bg: '#150B2E',
    symbol: '△',
    label: 'Reclaiming Safety',
    title: 'Trauma & PTSD Healing',
    description: 'Healing from trauma is not about erasing the past. It is about freeing yourself from its hold with evidence-based, trauma-informed care.',
    color: '#E9D5FF',
    accent: '#6D28D9',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
  },
  {
    id: 'students',
    bg: '#081525',
    symbol: '✦',
    label: 'Growing Minds',
    title: 'Children & Students',
    description: 'Support for children, teenagers, and students navigating pressure, emotions, and development with steady guidance and care.',
    color: '#FDE68A',
    accent: '#D97706',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Lives Touched' },
  { value: 10, suffix: ' yrs', label: 'Experience' },
  { value: 4, suffix: '', label: 'Specialties' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const MARQUEE_WORDS = ['Individual Therapy', '✦', 'Couples Healing', '◦', 'Trauma Recovery', '∞', 'Children & Teens', '△', 'Safe Space', '✦', 'Evidence-Based', '◦', 'Compassionate Care', '∞'];

const PILLARS = [
  { symbol: '◦', text: 'Cognitive Behavioral Therapy', color: '#C4B5FD' },
  { symbol: '△', text: 'Trauma-Informed Care (EMDR)', color: '#86EFAC' },
  { symbol: '∞', text: 'Attachment Theory', color: '#FDE68A' },
  { symbol: '✦', text: 'Somatic Practices', color: '#E9D5FF' },
];

function Counter({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
}

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.18, once: false });
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

  return (
    <div ref={ref} data-bg={service.bg} style={{ padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${service.accent}18, transparent 70%)`,
          top: '50%',
          left: isEven ? '-10%' : 'auto',
          right: isEven ? 'auto' : '-10%',
          transform: 'translateY(-50%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <motion.div
            style={{ order: isEven ? 0 : 1, y: textY }}
            initial={{ opacity: 0, x: isEven ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1, duration: 0.8 }} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <motion.span animate={isInView ? { rotate: [0, 360] } : {}} transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.5 }} style={{ fontSize: '1.6rem', color: service.accent, display: 'inline-block' }}>
                {service.symbol}
              </motion.span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', letterSpacing: '0.24em', color: service.accent, textTransform: 'uppercase', fontWeight: 700 }}>
                {service.label}
              </p>
            </motion.div>

            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 700, color: service.color, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.4rem' }}>
              {service.title}
            </h2>

            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.65)', lineHeight: 1.85, maxWidth: '440px', marginBottom: '2rem' }}>
              {service.description}
            </p>

            <motion.div initial={{ width: 0 }} animate={isInView ? { width: 60 } : { width: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ height: 2, background: `linear-gradient(to right, ${service.accent}, transparent)`, borderRadius: 2 }} />
          </motion.div>

          <motion.div
            style={{ order: isEven ? 1 : 0, y: imgY, position: 'relative' }}
            initial={{ opacity: 0, scale: 0.88, x: isEven ? 60 : -60 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.88, x: isEven ? 60 : -60 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${service.accent}28`, position: 'relative' }}>
              <motion.img src={service.image} alt={service.title} style={{ width: '100%', height: '110%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.7)', y: imgY }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${service.accent}30, transparent 55%)` }} />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                style={{ position: 'absolute', top: 20, right: 20, background: `${service.accent}22`, backdropFilter: 'blur(12px)', border: `1px solid ${service.accent}40`, borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: service.color }}
              >
                {service.symbol}
              </motion.div>
            </div>
            <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${service.accent}20, transparent 70%)`, filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({ onBookClick }) {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set((event.clientX - (rect.left + rect.width / 2)) / rect.width);
      mouseY.set((event.clientY - (rect.top + rect.height / 2)) / rect.height);
    };

    const element = sectionRef.current;
    element?.addEventListener('mousemove', handleMouseMove);
    return () => element?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} data-bg="#1A0F2E" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      {PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          style={{ position: 'absolute', width: particle.size, height: particle.size, borderRadius: '50%', background: particle.id % 3 === 0 ? '#C4B5FD' : particle.id % 3 === 1 ? '#86EFAC' : '#E9D5FF', left: `${particle.x}%`, top: `${particle.y}%`, opacity: particle.opacity, pointerEvents: 'none', zIndex: 1 }}
          animate={{ y: [-12, 12, -12], opacity: [particle.opacity, particle.opacity * 2.5, particle.opacity] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <motion.div style={{ position: 'absolute', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.45), transparent 70%)', top: -200, left: -200, filter: 'blur(80px)', mixBlendMode: 'screen', pointerEvents: 'none', x: useSpring(mouseX, { stiffness: 20, damping: 15 }), y: useSpring(mouseY, { stiffness: 20, damping: 15 }) }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.38), transparent 70%)', bottom: -150, right: -150, filter: 'blur(80px)', mixBlendMode: 'screen', pointerEvents: 'none' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      <motion.div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(134,239,172,0.22), transparent 70%)', top: '35%', right: '8%', filter: 'blur(60px)', pointerEvents: 'none' }} animate={{ y: [-30, 30, -30] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />

      <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 2, rotateY: useSpring(springX, { stiffness: 60 }), rotateX: useSpring(springY, { stiffness: 60 }) }}>
        <motion.div className="breathing-orb" style={{ marginBottom: '2rem', width: 120, height: 120 }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />

        <div style={{ marginBottom: '0.85rem' }}>
          {NAME_WORDS.map((word, wordIndex) => (
            <div key={word} style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${word}-${letterIndex}`}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + wordIndex * 0.35 + letterIndex * 0.055, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3.8rem, 11vw, 9rem)', fontWeight: 900, color: wordIndex === 0 ? '#C4B5FD' : '#E9D5FF', letterSpacing: '-0.03em', lineHeight: 1, display: 'inline-block' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }} style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, #86EFAC, transparent)', marginBottom: '1.2rem' }} />
        <motion.h2 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.15rem, 2.8vw, 1.75rem)', fontWeight: 400, fontStyle: 'italic', color: '#86EFAC', marginBottom: '1rem' }}>
          Find Your Way Back to You
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1.2 }} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(196,181,253,0.6)', maxWidth: '460px', lineHeight: 1.8, marginBottom: '2.2rem' }}>
          A sanctuary for healing, growth, and reconnection for individuals, couples, and families ready to begin.
        </motion.p>

        <motion.button onClick={onBookClick} className="cta-button" initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.06, y: -4, boxShadow: '0 0 50px rgba(124,58,237,0.7)' }} whileTap={{ scale: 0.96 }}>
          Begin Your Journey
        </motion.button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4, duration: 1.2 }} style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(196,181,253,0.35)' }}>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, transparent, rgba(196,181,253,0.5))' }} />
        <span style={{ fontFamily: 'Manrope', fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Scroll</span>
      </motion.div>
    </section>
  );
}

export function MarqueeStrip({ color = '#C4B5FD', bg = 'rgba(196,181,253,0.04)' }) {
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <div style={{ overflow: 'hidden', background: bg, borderTop: '1px solid rgba(196,181,253,0.07)', borderBottom: '1px solid rgba(196,181,253,0.07)', padding: '14px 0' }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: '36px', whiteSpace: 'nowrap', width: 'max-content' }}>
        {doubled.map((word, index) => (
          <span key={`${word}-${index}`} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: word === '✦' || word === '◦' || word === '∞' || word === '△' ? 'rgba(134,239,172,0.45)' : `${color}60` }}>
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.4, once: true });

  return (
    <div ref={ref} style={{ padding: '52px 24px', background: 'rgba(196,181,253,0.03)', borderTop: '1px solid rgba(196,181,253,0.07)', borderBottom: '1px solid rgba(196,181,253,0.07)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 400, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div className="max-w-5xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {STATS.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.1 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.4rem' }}>
              <Counter target={stat.value} suffix={stat.suffix} isInView={isInView} />
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

export function ServicesSection() {
  return (
    <section>
      {SERVICES.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </section>
  );
}

export function AboutPreview({ onLearnMore, onBlogClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.15, once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 0.96]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} data-bg="#1A0F2E" style={{ padding: '72px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(134,239,172,0.07), transparent 70%)', top: '-10%', right: '0%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -50, scale: 0.94 }} animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }}>
          <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(196,181,253,0.1)', aspectRatio: '3/4', position: 'relative' }}>
            <motion.img src={therapistPortrait} alt="Thamar Nissi" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65) saturate(0.6)', scale: imgScale, y: imgY }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,46,0.6) 0%, transparent 50%)' }} />
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.88 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: 0.8, duration: 0.9 }} style={{ position: 'absolute', bottom: 24, left: 20, right: 20, background: 'rgba(26,15,46,0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(196,181,253,0.15)', borderRadius: '16px', padding: '16px 18px' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '0.92rem', color: '#C4B5FD', lineHeight: 1.55, margin: 0 }}>
                "Healing begins the moment you allow yourself to be truly seen."
              </p>
            </motion.div>
          </div>
          <div style={{ position: 'absolute', inset: -24, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)', filter: 'blur(36px)', zIndex: -1, pointerEvents: 'none' }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', letterSpacing: '0.22em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
            Meet Your Guide
          </motion.p>

          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.4rem' }}>
            Thamar Nissi
          </h2>

          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.6)', lineHeight: 1.85, marginBottom: '2rem' }}>
            A licensed therapist with a warm, evidence-based approach. Thamar believes healing begins when we feel truly seen and safe.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.4rem' }}>
            {PILLARS.map((pillar, index) => (
              <motion.div key={pillar.text} initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + index * 0.08, duration: 0.7 }} whileHover={{ x: 6 }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(196,181,253,0.04)', border: '1px solid rgba(196,181,253,0.08)', cursor: 'default' }}>
                <span style={{ fontSize: '1.1rem', color: pillar.color, flexShrink: 0 }}>{pillar.symbol}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', color: 'rgba(253,248,240,0.65)', fontWeight: 500 }}>{pillar.text}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <motion.button onClick={onLearnMore} className="cta-button-outline" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              Read My Story
            </motion.button>
            <motion.button onClick={onBlogClick} className="cta-button" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              The Journal
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FooterCTA({ onBookClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <section ref={ref} data-bg="#0D0720" style={{ padding: '100px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(217,119,6,0.06), rgba(124,58,237,0.04), transparent)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.09), transparent 65%)', bottom: '-420px', left: '50%', transform: 'translateX(-50%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <motion.div animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.07), transparent 70%)', bottom: '12%', right: '12%', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', letterSpacing: '0.3em', color: 'rgba(196,181,253,0.35)', textTransform: 'uppercase', marginBottom: '2rem', fontWeight: 600 }}>
        Your Healing Awaits
      </motion.p>

      <motion.button onClick={onBookClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', fontWeight: 700, color: hovered ? '#86EFAC' : '#C4B5FD', letterSpacing: '-0.02em', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', lineHeight: 1.15, padding: '16px 24px', transition: 'color 0.4s ease', outline: 'none', position: 'relative', zIndex: 1 }}>
        Shall we begin?
      </motion.button>

      <motion.div animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }} style={{ height: 2, width: 280, background: 'linear-gradient(to right, transparent, #86EFAC, transparent)', borderRadius: 2, transformOrigin: 'center', marginTop: '-4px', marginBottom: '1.8rem', position: 'relative', zIndex: 1 }} transition={{ duration: 0.45 }} />

      <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.8 }} style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', color: 'rgba(196,181,253,0.3)', letterSpacing: '0.02em', position: 'relative', zIndex: 1 }}>
        Available Mon-Fri · First consultation is complimentary
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 1.4 }} style={{ marginTop: '3.5rem', display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontSize: '0.7rem', color: 'rgba(196,181,253,0.18)', position: 'relative', zIndex: 1 }}>
        <span>© 2026 Thamar Nissi</span>
        <span>·</span>
        <span>All sessions are strictly confidential</span>
        <span>·</span>
        <span>Healing through connection</span>
      </motion.div>
    </section>
  );
}