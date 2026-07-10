import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialSlider({ reviews, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  if (!reviews || reviews.length === 0) return null;

  const activeReview = reviews[currentIndex];

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleThumbnailClick = (index) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Get other reviews for the thumbnail preview (excluding current)
  const thumbnailReviews = reviews.filter((_, i) => i !== currentIndex).slice(0, 3);

  // Animation variants for vertical slide (enter from bottom/top, exit to top/bottom)
  const imageVariants = {
    enter: (dir) => ({
      y: dir === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => ({
      y: dir === 'right' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Animation variants for horizontal fade-slide for text
  const textVariants = {
    enter: (dir) => ({
      x: dir === 'right' ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir === 'right' ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className={`testimonial-slider-container ${className}`}>
      <div className="testimonial-slider-grid">
        
        {/* Left Column: Meta / Progress Indicator & Thumbnails */}
        <div className="testimonial-left-col">
          <div className="testimonial-meta">
            <span className="testimonial-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
            </span>
            <h2 className="testimonial-vertical-title">REVIEWS</h2>
          </div>

          <div className="testimonial-thumbnails">
            {thumbnailReviews.map((review) => {
              const originalIndex = reviews.findIndex((r) => r.id === review.id);
              return (
                <button
                  key={review.id}
                  onClick={() => handleThumbnailClick(originalIndex)}
                  className="testimonial-thumb-btn"
                  aria-label={`View review from ${review.name}`}
                >
                  <img
                    src={review.thumbnailSrc || review.imageSrc}
                    alt={review.name}
                    className="testimonial-thumb-img"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column: Main Image */}
        <div className="testimonial-center-col">
          <div className="testimonial-image-wrapper">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={activeReview.imageSrc}
                alt={activeReview.name}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="testimonial-main-img"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Text Info & Navigation */}
        <div className="testimonial-right-col">
          <div className="testimonial-text-wrapper">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="testimonial-text-content"
              >
                <span className="testimonial-affiliation">{activeReview.affiliation}</span>
                <h3 className="testimonial-name">{activeReview.name}</h3>
                <blockquote className="testimonial-quote">
                  "{activeReview.quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="testimonial-nav">
            <button
              onClick={handlePrev}
              className="testimonial-nav-btn"
              aria-label="Previous review"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button
              onClick={handleNext}
              className="testimonial-nav-btn primary"
              aria-label="Next review"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
