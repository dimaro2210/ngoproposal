import React, { useState } from 'react';

const mediaList = [
  { id: 1, type: 'image', category: 'Education', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700', alt: 'Education outreach' },
  { id: 2, type: 'image', category: 'Water', src: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700', alt: 'Clean water well' },
  { id: 3, type: 'image', category: 'Health', src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700', alt: 'Medical outreach' },
  { id: 4, type: 'image', category: 'Food', src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700', alt: 'Food aid delivery' },
  { id: 5, type: 'image', category: 'Health', src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700', alt: 'Nurse volunteer' },
  { id: 6, type: 'image', category: 'Education', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700', alt: 'Students smiling' },
  { id: 7, type: 'image', category: 'Water', src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700', alt: 'Solar borehole installation' },
  { id: 8, type: 'image', category: 'Food', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700', alt: 'Nutritious lunch serving' },
  { id: 9, type: 'image', category: 'Education', src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700', alt: 'Writing booklets' },
  { id: 10, type: 'image', category: 'Health', src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700', alt: 'Basic medical test' },
  { id: 11, type: 'image', category: 'Water', src: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700', alt: 'Pumping clean water' },
  { id: 12, type: 'image', category: 'Women', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700', alt: 'Women sewing workshop' }
];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const categories = ['All', 'Education', 'Water', 'Health', 'Food', 'Women'];

  const filteredMedia = filter === 'All' 
    ? mediaList 
    : mediaList.filter(item => item.category === filter);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Impact Gallery</h1>
          <p>A visual record of our community outreaches and project completions.</p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="gallery-block">
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? 'var(--secondary)' : '#FFF',
                  color: filter === cat ? '#FFF' : 'var(--text-dark)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '30px',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
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
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  background: 'rgba(12, 124, 89, 0.95)',
                  color: '#FFF',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  {img.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)} role="dialog" aria-modal="true">
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxSrc(null)} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
            <img src={lightboxSrc} alt="Enlarged view" />
          </div>
        </div>
      )}
    </>
  );
}
