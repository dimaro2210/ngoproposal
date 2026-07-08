import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <span className="footer-logo">Charius<span>.</span></span>
            <p>Empowering communities, transforming lives, and bridging developmental inequalities across Nigeria through sustainable direct initiatives.</p>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Our Programs</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/contact">Join Our Team</Link></li>
              <li><Link to="/programs">Active Causes</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li><i className="fas fa-map-marker-alt"></i> Abuja, Federal Capital Territory, Nigeria</li>
              <li><i className="fas fa-phone-alt"></i> +(234) 806-024-9813</li>
              <li><i className="far fa-envelope"></i> info@chariusngo.org</li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>© 2026 Charius Foundation. CAC Registered Nonprofit. All rights reserved.</p>
          <p>Built by DimaCode.</p>
        </div>
      </div>
    </footer>
  )
}
