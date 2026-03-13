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

export default function Book() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service_type: '', message: '', preferred_time: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedService = SERVICES.find((service) => service.id === form.service_type);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
            You've taken<br />the first step.
          </h2>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.6)', lineHeight: 1.8 }}>
            Thank you for reaching out. Thamar will be in touch within 24 hours to confirm your session.
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

  const canSubmit = form.name && form.email && form.service_type;

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
          <p className="section-kicker">What to expect</p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', margin: '0 0 1rem', color: '#E9D5FF', lineHeight: 1.08 }}>A calm first step, not a high-pressure intake.</h2>
          <p style={{ color: 'rgba(253,248,240,0.65)', margin: '0 0 1.5rem' }}>This custom booking flow stores requests locally for this demo. It is ready to connect to email, Airtable, Supabase, or your preferred backend next.</p>
          <div className="detail-chip-row" style={{ marginBottom: '1.4rem' }}>
            <span className="detail-chip">Responsive intake</span>
            <span className="detail-chip">Local persistence</span>
            <span className="detail-chip">External endpoint ready</span>
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
            Book a Session
          </h1>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.05rem', color: 'rgba(253,248,240,0.5)', lineHeight: 1.8, marginBottom: '3rem' }}>
            Share your details below and Thamar will reach out to find a time that works for you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
        >
          {/* Service selector */}
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
                      background: selected ? 'rgba(196,181,253,0.1)' : 'rgba(196,181,253,0.03)',
                      border: `1px solid ${selected ? 'rgba(196,181,253,0.38)' : 'rgba(196,181,253,0.1)'}`,
                      borderRadius: '18px', padding: '20px 16px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.3s ease', minHeight: '44px',
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

          {/* Name */}
          <div>
            <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Your Name</label>
            <input required value={form.name} onChange={set('name')} placeholder="Full name" className="immersive-input" />
          </div>

          {/* Email */}
          <div>
            <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Email Address</label>
            <input required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className="immersive-input" />
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
              Phone <span style={{ color: 'rgba(196,181,253,0.28)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <input value={form.phone} onChange={set('phone')} placeholder="+1 (000) 000-0000" className="immersive-input" />
          </div>

          {/* Preferred time */}
          <div>
            <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Preferred Time</label>
            <input value={form.preferred_time} onChange={set('preferred_time')} placeholder="e.g. Weekday mornings, Wednesday afternoons" className="immersive-input" />
          </div>

          {/* Message */}
          <div>
            <label style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.78rem', color: 'rgba(196,181,253,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
              What would you like to work on? <span style={{ color: 'rgba(196,181,253,0.28)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Share as little or as much as you're comfortable with..." className="immersive-input" style={{ resize: 'vertical', minHeight: '120px' }} />
          </div>

          <motion.button
            type="submit"
            disabled={submitting || !canSubmit}
            className="cta-button"
            style={{ opacity: (!canSubmit || submitting) ? 0.45 : 1, width: '100%', fontSize: '1.05rem' }}
            whileHover={canSubmit && !submitting ? { scale: 1.02, y: -2 } : {}}
            whileTap={canSubmit && !submitting ? { scale: 0.98 } : {}}
          >
            {submitting ? 'Sending...' : 'Request My Session'}
          </motion.button>

          {submitError ? (
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.88rem', color: '#fda4af', textAlign: 'center', lineHeight: 1.7, margin: 0 }}>
              {submitError}
            </p>
          ) : null}

          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.82rem', color: 'rgba(196,181,253,0.28)', textAlign: 'center', lineHeight: 1.7 }}>
            All information is kept strictly confidential.<br />First consultation is complimentary — 30 minutes, no pressure.
          </p>
        </motion.form>
        </div>
        </div>
      </div>
    </div>
  );
}