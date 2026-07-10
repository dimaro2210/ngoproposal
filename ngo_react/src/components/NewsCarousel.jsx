import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function NewsCarousel({ newsItems }) {
  const total = newsItems.length;
  const [currentIndex, setCurrentIndex] = useState(Math.floor(total / 2));
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimer = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = (index) => {
    setCurrentIndex((index + total) % total);
  };

  const next = () => {
    goTo(currentIndex + 1);
  };

  const prev = () => {
    goTo(currentIndex - 1);
  };

  // Autoplay loop
  useEffect(() => {
    if (!isPaused) {
      autoplayTimer.current = setInterval(next, 4000);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [currentIndex, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  if (!newsItems || total === 0) return null;

  return (
    <div 
      className="news-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background blob behind carousel */}
      <div className="carousel-ambient-glow" aria-hidden="true"></div>

      {/* Perspective Container */}
      <div 
        className="carousel-cards-container" 
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd}
      >
        {newsItems.map((item, index) => {
          let offset = index - currentIndex;
          // Wrap position
          let pos = (offset + total) % total;
          if (pos > Math.floor(total / 2)) {
            pos = pos - total;
          }

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;
          const isVisible = Math.abs(pos) <= 1;

          // Compute style transforms matching mockup
          const translatePercent = window.innerWidth < 640 ? 60 : 50;
          const rotateY = pos * -12;
          const scale = isCenter ? 1 : isAdjacent ? 0.82 : 0.65;
          const zIndex = isCenter ? 10 : isAdjacent ? 5 : 1;
          const opacity = isCenter ? 1 : isAdjacent ? 0.35 : 0;
          const blur = isCenter ? '0px' : '3px';

          return (
            <div
              key={item.id}
              className={`carousel-news-card ${isCenter ? 'center-card-shadow' : ''}`}
              style={{
                transform: `translateX(${pos * translatePercent}%) scale(${scale}) rotateY(${rotateY}deg)`,
                zIndex: zIndex,
                opacity: opacity,
                filter: `blur(${isCenter ? '0px' : '3px'})`,
                visibility: isVisible ? 'visible' : 'hidden',
              }}
              onClick={() => {
                if (!isCenter) goTo(index);
              }}
            >
              <div className="card-image-wrap">
                <img src={item.image} alt={item.title} draggable="false" />
                <span className="card-badge">{item.category}</span>
              </div>
              <div className="card-content-wrap">
                <span className="card-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {isCenter && (
                  <Link to="/contact" className="card-link btn-primary">
                    Read Full Story <i className="fas fa-arrow-right" style={{ marginLeft: '.5rem' }}></i>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <button className="carousel-nav-arrow left" onClick={prev} aria-label="Previous article">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-nav-arrow right" onClick={next} aria-label="Next article">
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dot Indicators */}
      <div className="carousel-dots-wrap">
        {newsItems.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot-btn ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Keyboard Helper */}
      <div className="carousel-keyboard-helper">
        <span className="key-key">←</span>
        <span className="key-key">→</span>
        <span>keys to navigate</span>
      </div>
    </div>
  );
}
