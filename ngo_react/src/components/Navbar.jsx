import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={close}>
            <i className="fas fa-globe"></i> Charius
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
            <Link to="/contact" className="btn-donate-nav" onClick={close}>Donate Now</Link>
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
          <Link to="/" className="logo" onClick={close}>
            <i className="fas fa-globe"></i> Charius
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
          <Link to="/contact" className="btn-primary" onClick={close} style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
            Donate Now <i className="fas fa-heart" style={{ marginLeft: '.5rem' }}></i>
          </Link>
        </div>
      </aside>
    </>
  )
}
