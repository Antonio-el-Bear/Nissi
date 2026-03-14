import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { createPageUrl } from './src/utils/routes.js';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPageName]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', page: 'Home' },
    { label: 'About', page: 'About' },
    { label: 'Journal', page: 'Blog' },
  ];

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progressScaleX }} />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-left" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-right" aria-hidden="true" />

      <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
        <div className="site-header-inner">
          <Link to={createPageUrl('Home')} className="brand-mark" aria-label="Go to home page">
            <span className="brand-mark-kicker">Therapy Practice</span>
            <span className="brand-mark-name">Tamar Nissi</span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`nav-link nav-link-soft ${currentPageName === item.page ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to={createPageUrl('Book')} className="cta-button header-cta">
              Book a Session
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-panel ${mobileMenuOpen ? 'mobile-nav-panel-open' : ''}`}>
        <div className="mobile-nav-scrim" onClick={() => setMobileMenuOpen(false)} />
        <div className="mobile-nav-sheet">
          <p className="mobile-nav-eyebrow">Navigate</p>
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              className={`mobile-nav-link ${currentPageName === item.page ? 'mobile-nav-link-active' : ''}`}
            >
              <span>{item.label}</span>
              <span className="mobile-nav-link-arrow">&rarr;</span>
            </Link>
          ))}
          <Link to={createPageUrl('Book')} className="cta-button mobile-nav-cta">
            Start Booking
          </Link>
        </div>
      </div>

      <main className="site-main">
        {children}
      </main>

      <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
        {navItems.map((item) => (
          <Link
            key={item.page}
            to={createPageUrl(item.page)}
            className={`mobile-bottom-link ${currentPageName === item.page ? 'mobile-bottom-link-active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
        <Link to={createPageUrl('Book')} className="mobile-bottom-book">
          Book
        </Link>
      </nav>
    </div>
  );
}