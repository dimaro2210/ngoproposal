import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6C2BD9 0%, #4C1D95 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(108, 43, 217, 0.3)'
            }}>
              <i className="fas fa-home"></i>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#1E293B', lineHeight: 1.1 }}>
                Saferplace <span style={{ color: '#6C2BD9' }}>Initiative</span>
              </span>
              <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 500, letterSpacing: '0.01em' }}>
                ...for Women & Child Health & Good Governance
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/programs">Programs</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <div className="nav-actions">
            <Link to="/contact" className="btn-donate-nav" onClick={close} style={{ background: '#6C2BD9', borderColor: '#6C2BD9' }}>Donate Now</Link>
            <button
              className="mobile-toggle"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Dark backdrop overlay */}
      <div
        className={`mobile-drawer-overlay${open ? ' active' : ''}`}
        onClick={close}
        aria-hidden="true"
      ></div>

      {/* Slide-from-left drawer */}
      <aside className={`mobile-drawer${open ? ' open' : ''}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <Link to="/" className="logo" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <i className="fas fa-home" style={{ color: '#6C2BD9' }}></i>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Saferplace Initiative</span>
          </Link>
          <button className="drawer-close-btn" onClick={close} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <ul className="mobile-drawer-links">
          <li><NavLink to="/" end onClick={close}><i className="fas fa-home"></i> Home</NavLink></li>
          <li><NavLink to="/about" onClick={close}><i className="fas fa-info-circle"></i> About</NavLink></li>
          <li><NavLink to="/programs" onClick={close}><i className="fas fa-project-diagram"></i> Programs</NavLink></li>
          <li><NavLink to="/gallery" onClick={close}><i className="fas fa-images"></i> Gallery</NavLink></li>
          <li><NavLink to="/contact" onClick={close}><i className="fas fa-envelope"></i> Contact</NavLink></li>
        </ul>

        <div className="mobile-drawer-footer">
          <Link to="/contact" className="btn-primary" onClick={close} style={{ width: '100%', textAlign: 'center', justifyContent: 'center', background: '#6C2BD9' }}>
            Donate Now <i className="fas fa-heart" style={{ marginLeft: '.5rem' }}></i>
          </Link>
        </div>
      </aside>
    </>
  )
}

