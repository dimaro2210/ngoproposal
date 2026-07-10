import React, { useState } from 'react';
import InfiniteGallery from '../components/InfiniteGallery';

const mediaList = [
  { id: 1,  category: 'Education', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700', alt: 'Education outreach' },
  { id: 2,  category: 'Water',     src: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700', alt: 'Clean water well' },
  { id: 3,  category: 'Health',    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700', alt: 'Medical outreach' },
  { id: 4,  category: 'Food',      src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700', alt: 'Food aid delivery' },
  { id: 5,  category: 'Health',    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700', alt: 'Nurse volunteer' },
  { id: 6,  category: 'Education', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700', alt: 'Students smiling' },
  { id: 7,  category: 'Water',     src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700', alt: 'Solar borehole installation' },
  { id: 8,  category: 'Food',      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700', alt: 'Nutritious lunch serving' },
  { id: 9,  category: 'Education', src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700', alt: 'Writing booklets' },
  { id: 10, category: 'Health',    src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700', alt: 'Basic medical test' },
  { id: 11, category: 'Water',     src: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700', alt: 'Pumping clean water' },
  { id: 12, category: 'Women',     src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700', alt: 'Women sewing workshop' },
];

// Image URLs passed to the 3-D hero
const heroImages = mediaList.map(m => ({ src: m.src, alt: m.alt }));

export default function Gallery() {
  const [filter, setFilter]       = useState('All');
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const categories    = ['All', 'Education', 'Water', 'Health', 'Food', 'Women'];
  const filteredMedia = filter === 'All'
    ? mediaList
    : mediaList.filter(item => item.category === filter);

  return (
    <>
      {/* ══════════════ 3-D INFINITE GALLERY HERO ══════════════ */}
      <section style={{ position: 'relative', background: '#0D1B18' }}>
        {/* Overlay text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          textAlign: 'center',
          padding: '1rem',
        }}>
          <span style={{
            color: 'var(--primary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '.85rem',
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            marginBottom: '.8rem',
            display: 'block',
          }}>Our Work In Pictures</span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: '.8rem',
            textShadow: '0 4px 24px rgba(0,0,0,.5)',
          }}>Impact Gallery</h1>
          <p style={{
            color: 'rgba(255,255,255,.65)',
            fontSize: '1rem',
            maxWidth: '480px',
            textShadow: '0 2px 8px rgba(0,0,0,.5)',
          }}>
            A visual record of our community outreaches and project completions across Nigeria.
          </p>
          <p style={{
            marginTop: '1.5rem',
            color: 'rgba(255,255,255,.4)',
            fontSize: '.8rem',
            letterSpacing: '.1em',
          }}>
            <i className="fas fa-mouse" style={{ marginRight: '.4rem' }}></i>
            SCROLL TO EXPLORE · HOVER TO INTERACT
          </p>
        </div>

        {/* 3-D Canvas */}
        <InfiniteGallery
          images={heroImages}
          speed={0.8}
          visibleCount={10}
          style={{ height: '80vh', minHeight: '520px' }}
          fadeSettings={{
            fadeIn:  { start: 0.05, end: 0.20 },
            fadeOut: { start: 0.75, end: 0.90 },
          }}
          blurSettings={{
            blurIn:  { start: 0.0,  end: 0.10 },
            blurOut: { start: 0.80, end: 0.95 },
            maxBlur: 6.0,
          }}
        />
      </section>

      {/* ══════════════ FILTER TABS + GRID ══════════════ */}
      <section className="gallery-block">
        <div className="container">

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background:    filter === cat ? 'var(--secondary)' : '#FFF',
                  color:         filter === cat ? '#FFF' : 'var(--text-dark)',
                  border:        '1px solid var(--border-color)',
                  borderRadius:  '30px',
                  padding:       '0.6rem 1.5rem',
                  fontSize:      '0.85rem',
                  fontWeight:    '700',
                  cursor:        'pointer',
                  transition:    'var(--transition)',
                  fontFamily:    'var(--font-display)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="gallery-grid">
            {filteredMedia.map(img => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setLightboxSrc(img.src)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setLightboxSrc(img.src)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="gallery-item-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
                <div style={{
                  position:     'absolute',
                  bottom:       '1rem',
                  left:         '1rem',
                  background:   'rgba(12,124,89,.95)',
                  color:        '#FFF',
                  padding:      '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize:     '0.75rem',
                  fontWeight:   '700',
                  pointerEvents:'none',
                  zIndex:        2,
                }}>
                  {img.category}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════ LIGHTBOX ══════════════ */}
      {lightboxSrc && (
        <div
          className="lightbox"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setLightboxSrc(null)}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
            <img src={lightboxSrc} alt="Enlarged view" />
          </div>
        </div>
      )}
    </>
  );
}
