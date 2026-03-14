import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Layout from './layout.jsx';
import Home from './src/pages/home.jsx';
import About from './src/pages/about.jsx';
import Blog from './src/pages/blog.jsx';
import BlogPost from './src/pages/blog-post.jsx';
import Book from './src/pages/book.jsx';

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

function RoutedApp() {
  const location = useLocation();
  const currentPageName = location.pathname === '/'
    ? 'Home'
    : location.pathname.startsWith('/Blog')
      ? 'Blog'
      : location.pathname.startsWith('/About')
        ? 'About'
        : location.pathname.startsWith('/Book')
          ? 'Book'
          : location.pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Layout currentPageName={currentPageName}>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="route-stage"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route path="/About" element={<About />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/Blog/:postId" element={<BlogPost />} />
            <Route path="/Book" element={<Book />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RoutedApp />
      <Analytics />
    </BrowserRouter>
  );
}