import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/routes.js';
import AboutPreview from '../components/home/aboutpreview.jsx';
import FooterCTA from '../components/home/footerCTA.jsx';
import HeroSection from '../components/home/herosection.jsx';
import JournalBackdrop from '../components/home/journalbackdrop.jsx';
import MarqueeStrip from '../components/home/marqueenstrip.jsx';
import ServicesSection from '../components/home/servicesection.jsx';
import StatsBar from '../components/home/statsbar.jsx';

export default function Home() {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('#1A0F2E');

  // Intersection observer for background morphing
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { bg } = entry.target.dataset;
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
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      <JournalBackdrop currentTone={bgColor} />
      <div style={{ position: 'relative', zIndex: 1 }}>
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
    </div>
  );
}