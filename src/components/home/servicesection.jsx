import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/use-mobile.jsx';

const SERVICES = [
  {
    id: 'individual',
    bg: '#1E0B45',
    symbol: '◦',
    label: 'For You',
    title: 'Individual Therapy',
    description: 'A private, compassionate space to explore your inner world. Whether navigating anxiety, depression, life transitions, or seeking deeper self-understanding — this is your time. No judgment. Just presence.',
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
    description: 'Relationships are living things — they need tending. Together we rebuild trust, improve communication, and rediscover the bond that brought you together. Healing is possible, even when it feels far away.',
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
    description: 'Healing from trauma is not about erasing the past — it\'s about freeing yourself from it. Using evidence-based, trauma-informed approaches, we create safety first, always. You are not your wounds.',
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
    description: 'Young minds deserve support too. Helping children, teenagers, and students navigate academic pressure, social challenges, and emotional development. Growing up can be hard — you don\'t have to do it alone.',
    color: '#FDE68A',
    accent: '#D97706',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
  },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { threshold: 0.18, once: true });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-8%', '8%']);
  const textY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['4%', '-4%']);

  useEffect(() => {
    if (!isInView || !textRef.current || !imageRef.current) return undefined;

    if (shouldReduceMotion) {
      const textNodes = textRef.current.querySelectorAll('[data-service-reveal]');
      textNodes.forEach((node) => {
        node.style.opacity = '1';
        node.style.transform = 'none';
        node.style.filter = 'none';
      });
      imageRef.current.style.opacity = '1';
      imageRef.current.style.transform = 'none';
      if (badgeRef.current) {
        badgeRef.current.style.opacity = '1';
        badgeRef.current.style.transform = 'none';
      }
      return undefined;
    }

    const textNodes = textRef.current.querySelectorAll('[data-service-reveal]');
    const textAnimation = animate(textNodes, {
      translateX: [isEven ? '-28px' : '28px', '0px'],
      translateY: ['14px', '0px'],
      opacity: [0, 1],
      blur: ['7px', '0px'],
      delay: stagger(90, { start: 100 }),
      duration: 680,
      ease: 'out(3)',
    });

    const imageAnimation = animate(imageRef.current, {
      translateX: [isEven ? '42px' : '-42px', '0px'],
      scale: [0.94, 1],
      opacity: [0, 1],
      duration: 920,
      ease: 'out(4)',
    });

    const badgeAnimation = badgeRef.current
      ? animate(badgeRef.current, {
          scale: [0.5, 1],
          rotateZ: ['-14deg', '0deg'],
          opacity: [0, 1],
          delay: 520,
          duration: 560,
          ease: 'out(4)',
        })
      : null;

    return () => {
      textAnimation?.revert?.();
      imageAnimation?.revert?.();
      badgeAnimation?.revert?.();
    };
  }, [isEven, isInView, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      data-bg={service.bg}
      style={{ padding: isMobile ? '28px 0' : '64px 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section glow */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle, ${service.accent}18, transparent 70%)`,
        top: '50%', left: isEven ? '-10%' : 'auto', right: isEven ? 'auto' : '-10%',
        transform: 'translateY(-50%)', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '18px' : '48px',
          alignItems: 'center',
        }}>
          {/* Text */}
          <motion.div
            ref={textRef}
            style={{
              order: isMobile ? 1 : (isEven ? 0 : 1),
              y: textY,
              padding: isMobile ? '1.2rem 1.1rem 1.3rem' : 0,
              borderRadius: isMobile ? '1.5rem' : 0,
              border: isMobile ? '1px solid rgba(196,181,253,0.1)' : 'none',
              background: isMobile ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))' : 'transparent',
              backdropFilter: isMobile ? 'blur(18px)' : 'none',
            }}
          >
            <motion.div
              data-service-reveal
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}
            >
              <motion.span
                animate={shouldReduceMotion ? undefined : isInView ? { rotate: [0, 360] } : {}}
                transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'linear', delay: 0.7 }}
                style={{ fontSize: '1.6rem', color: service.accent, display: 'inline-block' }}
              >
                {service.symbol}
              </motion.span>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.75rem', letterSpacing: '0.24em', color: service.accent, textTransform: 'uppercase', fontWeight: 700 }}>
                {service.label}
              </p>
            </motion.div>

            <h2 data-service-reveal style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 700, color: service.color,
              letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: '1.4rem',
            }}>
              {service.title}
            </h2>

            <p data-service-reveal style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem',
              color: 'rgba(253,248,240,0.65)', lineHeight: 1.85,
              maxWidth: isMobile ? '100%' : '440px', marginBottom: '2rem',
            }}>
              {service.description}
            </p>

            {/* Animated underline */}
            <motion.div
              data-service-reveal
              initial={shouldReduceMotion ? false : { width: 0 }}
              animate={isInView ? { width: 60 } : { width: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 2, background: `linear-gradient(to right, ${service.accent}, transparent)`, borderRadius: 2 }}
            />
          </motion.div>

          {/* Image with parallax */}
          <motion.div
            ref={imageRef}
            style={{ order: isMobile ? 0 : (isEven ? 1 : 0), y: imgY, position: 'relative' }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
          >
            <div style={{
              width: '100%', aspectRatio: isMobile ? '5/4' : '4/3',
              borderRadius: isMobile ? '28px' : '24px', overflow: 'hidden',
              border: `1px solid ${service.accent}28`,
              position: 'relative',
              boxShadow: isMobile ? '0 20px 46px rgba(5, 3, 14, 0.32)' : 'none',
            }}>
              <motion.img
                src={service.image}
                alt={service.title}
                style={{ width: '100%', height: '110%', objectFit: 'cover', filter: 'brightness(0.6) saturate(0.7)', y: imgY }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${service.accent}30, transparent 55%)` }} />
              {/* Corner badge */}
              <motion.div
                ref={badgeRef}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: `${service.accent}22`, backdropFilter: 'blur(12px)',
                  border: `1px solid ${service.accent}40`,
                  borderRadius: '50%', width: 56, height: 56,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', color: service.color,
                }}
              >
                {service.symbol}
              </motion.div>
            </div>
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: -30, borderRadius: '50%',
              background: `radial-gradient(circle, ${service.accent}20, transparent 70%)`,
              filter: 'blur(40px)', zIndex: -1, pointerEvents: 'none',
            }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section>
      {SERVICES.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} />
      ))}
    </section>
  );
}