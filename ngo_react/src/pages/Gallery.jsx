import { useState } from 'react'

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700', alt: 'Students smiling' },
  { id: 2, src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700', alt: 'Education outreach' },
  { id: 3, src: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700', alt: 'Clean water well' },
  { id: 4, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700', alt: 'Medical outreach' },
  { id: 5, src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700', alt: 'Food aid delivery' },
  { id: 6, src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700', alt: 'Nurse volunteer' },
  { id: 7, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700', alt: 'Community event' },
  { id: 8, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700', alt: 'Volunteer team' },
  { id: 9, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=700', alt: 'Field worker' },
]

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState(null)

  const openLightbox = (src) => setLightboxSrc(src)
  const closeLightbox = () => setLightboxSrc(null)

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Impact Gallery</h1>
          <p>A visual record of our community outreaches and project completions.</p>
        </div>
      </section>

      <section className="gallery-block">
        <div className="container">
          <div className="gallery-grid">
            {images.map(img => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => openLightbox(img.src)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && openLightbox(img.src)}
              >
                <img src={img.src} alt={img.alt} />
                <div className="gallery-item-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
            <img src={lightboxSrc} alt="Enlarged view" />
          </div>
        </div>
      )}
    </>
  )
}
