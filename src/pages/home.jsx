import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/routes.js';
import { AboutPreview, FooterCTA, HeroSection, MarqueeStrip, ServicesSection, StatsBar } from '../components/home/sections.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('#1A0F2E');

  // Intersection observer for background morphing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bg = entry.target.dataset.bg;
            if (bg) setBgColor(bg);
          }
        });
      },
      { threshold: 0.35 }
    );

    const timer = setTimeout(() => {
      document.querySelectorAll('[data-bg]').forEach((el) => observer.observe(el));
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const goToBook = () => navigate(createPageUrl('Book'));

  return (
    <div
      style={{
        background: bgColor,
        transition: 'background 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <HeroSection onBookClick={goToBook} />
      <MarqueeStrip />
      <StatsBar />
      <ServicesSection />
      <MarqueeStrip color="#86EFAC" bg="rgba(13,148,136,0.04)" />
      <AboutPreview
        onLearnMore={() => navigate(createPageUrl('About'))}
        onBlogClick={() => navigate(createPageUrl('Blog'))}
      />
      <FooterCTA onBookClick={goToBook} />
    </div>
  );
}