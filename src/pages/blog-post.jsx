import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { siteApi } from '../api/siteApi.js';
import { createPageUrl } from '../utils/routes.js';

const CAT_STYLE = {
  trauma: { color: '#E9D5FF', bg: 'rgba(124,58,237,0.15)' },
  relationships: { color: '#86EFAC', bg: 'rgba(13,148,136,0.15)' },
  'self-care': { color: '#FDE68A', bg: 'rgba(217,119,6,0.15)' },
  'children-teens': { color: '#BAE6FD', bg: 'rgba(14,165,233,0.13)' },
  mindfulness: { color: '#C4B5FD', bg: 'rgba(139,92,246,0.15)' },
};

export default function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    siteApi.getBlogPost(postId)
      .then((data) => setPost(data))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <div className="page-shell page-shell-narrow" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="editorial-panel" style={{ textAlign: 'center' }}>Loading article...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="page-shell page-shell-narrow" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="editorial-panel" style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: 0, color: '#E9D5FF' }}>Article not found</h1>
          <p style={{ color: 'rgba(253,248,240,0.62)' }}>This journal entry could not be found.</p>
          <Link to={createPageUrl('Blog')} className="cta-button-outline">Back to Journal</Link>
        </div>
      </div>
    );
  }

  const categoryStyle = CAT_STYLE[post.category] || CAT_STYLE.mindfulness;

  return (
    <div className="page-shell page-shell-narrow" style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="editorial-panel"
        style={{ padding: 'clamp(1.4rem, 3vw, 2.4rem)' }}
      >
        <Link to={createPageUrl('Blog')} className="inline-back-link">
          <ArrowLeft size={16} />
          <span>Back to Journal</span>
        </Link>

        <div className="detail-chip-row" style={{ marginBottom: '1.4rem' }}>
          <span className="detail-chip" style={{ color: categoryStyle.color, background: categoryStyle.bg, borderColor: 'transparent' }}>
            {post.category.replace('-', ' ')}
          </span>
          <span className="detail-chip"><Clock size={14} /> {post.read_time} min read</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.7rem, 6vw, 4.8rem)', lineHeight: 1.02, margin: '0 0 1rem', color: '#E9D5FF' }}>{post.title}</h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(253,248,240,0.68)', margin: '0 0 2rem' }}>{post.subheading}</p>

        <div className="article-body">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.article>
    </div>
  );
}