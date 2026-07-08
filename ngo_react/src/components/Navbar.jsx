import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={close}>
          <i className="fas fa-globe"></i> Charius
        </Link>

        <ul className={`nav-links${open ? ' active' : ''}`}>
          <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={close}>About</NavLink></li>
          <li><NavLink to="/programs" onClick={close}>Programs</NavLink></li>
          <li><NavLink to="/gallery" onClick={close}>Gallery</NavLink></li>
          <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-icon-btn" aria-label="Search"><i className="fas fa-search"></i></button>
          <button className="nav-icon-btn" aria-label="Account"><i className="far fa-user"></i></button>
          <Link to="/contact" className="btn-donate-nav" onClick={close}>Donate Now</Link>
          <button
            className="mobile-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}
