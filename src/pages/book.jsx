import React, { useState } from 'react';
import { siteApi } from '../api/siteApi.js';
import { motion } from 'framer-motion';
import { CheckCircle, User, Heart, Shield, GraduationCap } from 'lucide-react';
import { bookingExperience } from '../data/siteContent.js';

const SERVICES = [
  { id: 'individual', label: 'Individual Therapy', Icon: User, desc: 'One-on-one sessions for personal growth and healing', color: '#C4B5FD' },
  { id: 'couples', label: 'Couples Therapy', Icon: Heart, desc: 'Strengthening bonds and rebuilding connection', color: '#86EFAC' },
  { id: 'trauma', label: 'Trauma & PTSD', Icon: Shield, desc: 'Trauma-informed care in a safe environment', color: '#E9D5FF' },
  { id: 'children-students', label: 'Children & Students', Icon: GraduationCap, desc: 'Support for young minds and their families', color: '#FDE68A' },
];

const BOOKING_STEPS = [
  {
    id: 1,
    label: 'Choose support',
    title: 'What kind of support feels right today?',
    description: 'Select the path that best matches what you need right now, then share the minimum needed to begin.',
  },
  {
    id: 2,
    label: 'Shape the session',
    title: 'Add the details that would help this feel easier.',
    description: 'Tell us when you prefer to meet and anything you want Thamar to hold in mind before reaching out.',
  },
];

const SAFE_SIGNALS = [
  'Private by default',
  'Clear next steps',
  'Pressure-free consult',
];

export default function Book() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service_type: '', message: '', preferred_time: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const selectedService = SERVICES.find((service) => service.id === form.service_type);
  const activeStep = BOOKING_STEPS.find((step) => step.id === currentStep) || BOOKING_STEPS[0];

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canContinue = Boolean(form.service_type && form.name && form.email);
  const canSubmit = Boolean(form.name && form.email && form.service_type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await siteApi.submitAppointment(form);
      setSubmitted(true);
    } catch (error) {
      setSubmitError('Unable to send your request right now. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #1A0F2E, #0F1E30)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card"
          style={{ maxWidth: 480, width: '100%', padding: '64px 44px', textAlign: 'center' }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 180 }} style={{ marginBottom: '2rem' }}>
            <CheckCircle size={72} style={{ color: '#86EFAC', margin: '0 auto' }} />
          </motion.div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 700, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            Your first step is in motion.
          </h2>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.6)', lineHeight: 1.8 }}>
            Thank you for reaching out. Thamar will be in touch within 24 hours with clear next steps and a time that feels workable for you.
          </p>
          {selectedService ? (
            <div className="detail-chip-row" style={{ justifyContent: 'center', marginTop: '1.4rem' }}>
              <span className="detail-chip">{selectedService.label}</span>
              {form.preferred_time ? <span className="detail-chip">{form.preferred_time}</span> : null}
            </div>
          ) : null}
          <div style={{ marginTop: '2rem', height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, #86EFAC, transparent)', margin: '2rem auto 0' }} />
        </motion.div>
      </div>
    );
  }

  const encouragementLine = selectedService
    ? `You chose ${selectedService.label.toLowerCase()} — a thoughtful first step toward steadier ground.`
    : 'Choose the kind of support that feels closest to what you need right now.';

  return (
    <div style={{
      background: 'linear-gradient(160deg, #1A0F2E 0%, #0F1E30 60%, #1A0F2E 100%)',
      minHeight: '100vh',
      paddingBottom: '130px',
      overflowX: 'hidden',
    }}>
      <div style={{ position: 'fixed', top: 0, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.14), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.1), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '100px', position: 'relative', zIndex: 1 }}>
        <div className="booking-grid">
        <motion.aside initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="editorial-panel booking-side-panel">
          <p className="section-kicker">Booking Console</p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', margin: '0 0 1rem', color: '#E9D5FF', lineHeight: 1.08 }}>A premium, pressure-free arrival into care.</h2>
          <p style={{ color: 'rgba(253,248,240,0.65)', margin: '0 0 1.5rem' }}>This booking flow is intentionally quiet and easy to move through. No clinical harshness. No high-pressure intake. Just a calm sequence into support.</p>
          <div className="detail-chip-row" style={{ marginBottom: '1.4rem' }}>
            {SAFE_SIGNALS.map((signal) => (
              <span key={signal} className="detail-chip">{signal}</span>
            ))}
          </div>
          <div style={{ padding: '1rem 1.1rem', borderRadius: '18px', border: '1px solid rgba(134,239,172,0.14)', background: 'linear-gradient(135deg, rgba(134,239,172,0.08), rgba(196,181,253,0.04))', marginBottom: '1.2rem' }}>
            <p style={{ margin: 0, fontFamily: 'Manrope, sans-serif', fontSize: '0.92rem', color: 'rgba(253,248,240,0.8)', lineHeight: 1.7 }}>
              You do not need to have the perfect words yet. A name, an email, and the kind of support you want is enough to begin.
            </p>
          </div>
          <div style={{ position: 'relative', borderRadius: '24px', border: '1px solid rgba(196,181,253,0.12)', background: 'linear-gradient(160deg, rgba(16,9,30,0.92), rgba(28,18,51,0.78))', padding: '1.1rem', overflow: 'hidden', marginBottom: '1.2rem' }}>
            <div style={{ position: 'absolute', top: '-12%', right: '-5%', width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle, ${selectedService?.color || '#86EFAC'}22, transparent 70%)`, filter: 'blur(16px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', position: 'relative', zIndex: 1, marginBottom: '0.9rem' }}>
              <div>
                <p style={{ margin: '0 0 0.3rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: selectedService?.color || '#86EFAC', fontWeight: 700 }}>
                  Current step
                </p>
                <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', color: '#F8F2FF', lineHeight: 1.08 }}>
                  {activeStep.title}
                </h3>
              </div>
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <motion.div
                  style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${(selectedService?.color || '#86EFAC')}55` }}
                  animate={{ scale: [1, 1.55], opacity: [0.28, 0] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: `radial-gradient(circle, ${selectedService?.color || '#86EFAC'}, rgba(255,255,255,0.1))`, boxShadow: `0 0 28px ${selectedService?.color || '#86EFAC'}44` }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
            <p style={{ position: 'relative', zIndex: 1, margin: '0 0 0.9rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', color: 'rgba(253,248,240,0.72)', lineHeight: 1.7 }}>
              {activeStep.description}
            </p>
            <div style={{ display: 'grid', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
              {BOOKING_STEPS.map((step) => {
                const isActive = step.id === currentStep;
                const isComplete = currentStep > step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '10px',
                      alignItems: 'start',
                      textAlign: 'left',
                      padding: '0.85rem 0.95rem',
                      borderRadius: '18px',
                      border: `1px solid ${isActive ? 'rgba(196,181,253,0.28)' : 'rgba(196,181,253,0.08)'}`,
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                      color: '#FCF6EE',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isComplete || isActive ? 'rgba(196,181,253,0.18)' : 'rgba(255,255,255,0.05)', color: isComplete || isActive ? '#C4B5FD' : 'rgba(252,246,238,0.52)', fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>
                      {step.id}
                    </span>
                    <span>
                      <strong style={{ display: 'block', fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem', marginBottom: '0.15rem' }}>{step.label}</strong>
                      <span style={{ display: 'block', fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(252,246,238,0.58)', lineHeight: 1.6 }}>{step.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {bookingExperience.map((item) => (
              <div key={item} className="soft-list-item">{item}</div>
            ))}
          </div>
        </motion.aside>

        <div className="max-w-2xl mx-auto" style={{ width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', letterSpacing: '0.22em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>Begin Here</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Enter a calmer future.
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.5)', lineHeight: 1.8, marginBottom: '3rem' }}>
            This is a two-step arrival, not a cold intake. Share only what feels useful right now, and Thamar will follow up with clarity and care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.9 }}
          style={{
            marginBottom: '1.7rem',
            padding: '1rem 1.15rem',
            borderRadius: '20px',
            border: '1px solid rgba(196,181,253,0.12)',
            background: 'linear-gradient(135deg, rgba(196,181,253,0.08), rgba(13,148,136,0.05))',
            boxShadow: '0 14px 40px rgba(6, 8, 24, 0.2)',
          }}
        >
          <div className="detail-chip-row" style={{ marginBottom: '0.7rem' }}>
            <span className="detail-chip">30-minute complimentary consult</span>
            <span className="detail-chip">Response within 24 hours</span>
            <span className="detail-chip">Confidential support</span>
          </div>
          <p style={{ margin: 0, fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', color: 'rgba(253,248,240,0.78)', lineHeight: 1.7 }}>
            {encouragementLine}
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
          {BOOKING_STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '44px',
                  padding: '0.75rem 1rem',
                  borderRadius: '999px',
                  border: `1px solid ${isActive ? 'rgba(196,181,253,0.3)' : 'rgba(196,181,253,0.12)'}`,
                  background: isActive ? 'rgba(196,181,253,0.12)' : 'rgba(255,255,255,0.03)',
                  color: '#FCF6EE',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 22, height: 22, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isComplete || isActive ? 'rgba(134,239,172,0.16)' : 'rgba(255,255,255,0.05)', color: isComplete ? '#86EFAC' : '#C4B5FD', fontSize: '0.75rem', fontWeight: 700 }}>{step.id}</span>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.84rem', fontWeight: 600 }}>{step.label}</span>
              </button>
            );
          })}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          {currentStep === 1 ? (
            <>
              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '14px' }}>
                  What brings you here?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {SERVICES.map(({ id, label, Icon, desc, color }) => {
                    const selected = form.service_type === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, service_type: id }))}
                        style={{
                          background: selected ? 'linear-gradient(135deg, rgba(196,181,253,0.14), rgba(134,239,172,0.08))' : 'rgba(196,181,253,0.03)',
                          border: `1px solid ${selected ? 'rgba(196,181,253,0.38)' : 'rgba(196,181,253,0.1)'}`,
                          borderRadius: '18px', padding: '20px 16px',
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.3s ease', minHeight: '44px',
                          boxShadow: selected ? '0 18px 36px rgba(12, 18, 36, 0.18)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                          <Icon size={16} style={{ color }} />
                          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, color, fontSize: '0.9rem' }}>{label}</span>
                        </div>
                        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', color: 'rgba(253,248,240,0.38)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedService ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: '18px',
                    border: `1px solid ${selectedService.color}33`,
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <p style={{ margin: '0 0 0.45rem', fontFamily: 'Manrope, sans-serif', fontSize: '0.76rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: selectedService.color, fontWeight: 700 }}>
                    Selected support path
                  </p>
                  <h3 style={{ margin: '0 0 0.4rem', fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', color: '#F8F2FF' }}>
                    {selectedService.label}
                  </h3>
                  <p style={{ margin: 0, fontFamily: 'Manrope, sans-serif', fontSize: '0.92rem', color: 'rgba(253,248,240,0.62)', lineHeight: 1.7 }}>
                    {selectedService.desc}. This request does not commit you to anything. It simply opens the conversation.
                  </p>
                </motion.div>
              ) : null}

              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Your Name</label>
                <input required value={form.name} onChange={set('name')} placeholder="Full name" className="immersive-input" />
              </div>

              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Email Address</label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className="immersive-input" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canContinue}
                  className="cta-button"
                  style={{ opacity: canContinue ? 1 : 0.45 }}
                  whileHover={canContinue ? { scale: 1.02, y: -2 } : {}}
                  whileTap={canContinue ? { scale: 0.98 } : {}}
                >
                  Continue with details
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                  Phone <span style={{ color: 'rgba(196,181,253,0.28)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <input value={form.phone} onChange={set('phone')} placeholder="+1 (000) 000-0000" className="immersive-input" />
              </div>

              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Preferred Time</label>
                <input value={form.preferred_time} onChange={set('preferred_time')} placeholder="e.g. Weekday mornings, Wednesday afternoons" className="immersive-input" />
              </div>

              <div>
                <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                  What would you like to work on? <span style={{ color: 'rgba(196,181,253,0.28)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                </label>
                <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Share as little or as much as you're comfortable with..." className="immersive-input" style={{ resize: 'vertical', minHeight: '120px' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="cta-button-outline"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1 }}
                >
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={submitting || !canSubmit}
                  className="cta-button"
                  style={{ opacity: (!canSubmit || submitting) ? 0.45 : 1, flex: 1, fontSize: '1.05rem' }}
                  whileHover={canSubmit && !submitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={canSubmit && !submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? 'Sending your request...' : 'Reserve My Safe First Step'}
                </motion.button>
              </div>
            </>
          )}

          {submitError ? (
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.88rem', color: '#fda4af', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
              {submitError}
            </p>
          ) : null}

          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem', color: 'rgba(196,181,253,0.28)', textAlign: 'center', lineHeight: 1.7 }}>
            All information is kept strictly confidential.<br />First consultation is complimentary — 30 minutes, calm and pressure-free.
          </p>
        </motion.form>
        </div>
        </div>
      </div>
    </div>
  );
}