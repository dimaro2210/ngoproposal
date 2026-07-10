import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const FULL_TEXT = "Your donation means a lot to them. Every naira you give reaches a child, a village, a life.";

export default function CTAReveal() {
  const sectionRef = useRef(null);
  const [wordProgress, setWordProgress] = useState([]);
  const rafRef = useRef(null);

  const words = FULL_TEXT.split(' ');

  const updateReveal = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewH = window.innerHeight;

    // progress 0 → 1 as section scrolls through viewport
    // starts when top edge enters bottom of screen, ends when bottom exits top
    const sectionH = rect.height;
    const totalTrack = viewH + sectionH;
    const scrolled = viewH - rect.top;
    const raw = scrolled / totalTrack;
    const total = Math.max(0, Math.min(1, raw));

    const perWord = 1 / words.length;
    const progArr = words.map((_, i) => {
      const start = i * perWord;
      const p = Math.max(0, Math.min(1, (total - start) / perWord));
      // ease-out cubic
      return 1 - Math.pow(1 - p, 3);
    });

    setWordProgress(progArr);
    rafRef.current = null;
  }, [words.length]);

  const onScroll = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateReveal);
    }
  }, [updateReveal]);

  useEffect(() => {
    updateReveal();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, updateReveal]);

  return (
    <section className="cta-reveal-section" ref={sectionRef}>
      {/* Ambient flares */}
      <div className="cta-reveal-orb cta-reveal-orb-1" aria-hidden="true"></div>
      <div className="cta-reveal-orb cta-reveal-orb-2" aria-hidden="true"></div>

      {/* Subtle grid background */}
      <div className="cta-reveal-grid" aria-hidden="true"></div>

      <div className="container cta-reveal-inner">

        {/* Top label */}
        <div className="cta-reveal-label">
          <span className="cta-reveal-dot"></span>
          <span>Your Impact</span>
        </div>

        {/* Scroll-driven word reveal text */}
        <p className="cta-reveal-text" aria-label={FULL_TEXT}>
          {words.map((word, i) => (
            <span key={i} className="cta-word-wrapper" aria-hidden="true">
              {/* dim layer */}
              <span className="cta-word-dim">{word}</span>
              {/* bright layer fades in */}
              <span
                className="cta-word-bright"
                style={{ opacity: wordProgress[i] ?? 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </p>

        {/* Bottom hairline + CTA */}
        <div className="cta-reveal-footer">
          <div className="cta-reveal-line"></div>
          <div className="cta-reveal-actions">
            <Link to="/contact" className="btn-primary cta-reveal-btn">
              Donate Now <i className="fas fa-heart" style={{ marginLeft: '.5rem' }}></i>
            </Link>
            <Link to="/about" className="cta-reveal-ghost-btn">
              Learn Our Story
            </Link>
          </div>
          <div className="cta-reveal-line"></div>
        </div>

        {/* Scroll nudge */}
        <div className="cta-scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <i className="fas fa-arrow-down"></i>
        </div>
      </div>
    </section>
  );
}
