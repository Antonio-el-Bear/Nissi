import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteApi } from '../api/siteApi.js';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { createPageUrl } from '../utils/routes.js';

const CAT_STYLE = {
  trauma: { color: '#E9D5FF', bg: 'rgba(124,58,237,0.15)' },
  relationships: { color: '#86EFAC', bg: 'rgba(13,148,136,0.15)' },
  'self-care': { color: '#FDE68A', bg: 'rgba(217,119,6,0.15)' },
  'children-teens': { color: '#BAE6FD', bg: 'rgba(14,165,233,0.13)' },
  mindfulness: { color: '#C4B5FD', bg: 'rgba(139,92,246,0.15)' },
};

const CATEGORIES = ['all', 'self-care', 'relationships', 'trauma', 'mindfulness', 'children-teens'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    siteApi.listBlogPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch(() => {
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);
  const totalReadMinutes = filtered.reduce((sum, post) => sum + post.read_time, 0);

  return (
    <div style={{
      background: 'linear-gradient(160deg, #1A0F2E 0%, #0F1E30 55%, #1A0F2E 100%)',
      minHeight: '100vh',
      paddingBottom: '130px',
      overflowX: 'hidden',
    }}>
      <div style={{ position: 'fixed', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,0.14), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <header style={{ padding: '120px 24px 60px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.8rem', letterSpacing: '0.22em', color: '#86EFAC', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>
          Healing Through Words
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, color: '#C4B5FD', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
          The Journal
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', color: 'rgba(253,248,240,0.55)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.75 }}>
          Insights, reflections, and practical guidance for your healing journey.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }} className="editorial-panel" style={{ maxWidth: '860px', margin: '2.5rem auto 0', textAlign: 'left' }}>
          <div className="detail-chip-row">
            <span className="detail-chip">{posts.length} articles</span>
            <span className="detail-chip">{totalReadMinutes} min curated reading</span>
            <span className="detail-chip">Practical tools and reflections</span>
          </div>
        </motion.div>
      </header>

      {/* Category filter */}
      <div style={{ padding: '0 24px 60px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 1 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              fontFamily: 'Manrope, sans-serif', fontSize: '0.85rem', fontWeight: 500,
              padding: '10px 22px', borderRadius: '9999px', cursor: 'pointer',
              border: '1px solid rgba(196,181,253,0.18)',
              background: filter === cat ? 'rgba(196,181,253,0.12)' : 'transparent',
              color: filter === cat ? '#C4B5FD' : 'rgba(196,181,253,0.42)',
              transition: 'all 0.3s ease', minHeight: '44px',
            }}
          >
            {cat === 'all' ? 'All Topics' : cat.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="max-w-5xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'rgba(196,181,253,0.35)', fontFamily: 'Manrope', padding: '80px 0', fontSize: '1rem', letterSpacing: '0.1em' }}>
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="editorial-panel" style={{ textAlign: 'center', padding: '56px 24px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#E9D5FF', margin: '0 0 0.75rem' }}>No articles in this category yet</h2>
            <p style={{ margin: 0, color: 'rgba(253,248,240,0.6)' }}>Switch filters or check back soon for new journal entries.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '28px' }}>
            {filtered.map((post, i) => {
              const cs = CAT_STYLE[post.category] || CAT_STYLE.mindfulness;
              return (
                <motion.article
                  key={post.id || i}
                  className="glass-card"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.08 }}
                  whileHover={{ y: -8, boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}
                  style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0' }}
                >
                  <Link to={`${createPageUrl('Blog')}/${post.id}`} style={{ display: 'contents' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{
                      fontFamily: 'Manrope, sans-serif', fontSize: '0.72rem', fontWeight: 700,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: cs.color, background: cs.bg, padding: '4px 14px', borderRadius: '9999px',
                    }}>
                      {post.category?.replace('-', ' ')}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(196,181,253,0.3)', fontFamily: 'Manrope', fontSize: '0.78rem' }}>
                      <Clock size={11} />
                      <span>{post.read_time} min</span>
                    </div>
                  </div>

                  <h2 style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700,
                    color: '#E9D5FF', letterSpacing: '-0.01em', lineHeight: 1.35,
                    marginBottom: '1rem', flexGrow: 1,
                  }}>
                    {post.title}
                  </h2>

                  <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.95rem', color: 'rgba(253,248,240,0.5)', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C4B5FD', fontFamily: 'Manrope', fontSize: '0.875rem', fontWeight: 600 }}>
                    <span>Read more</span>
                    <ArrowRight size={14} />
                  </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}