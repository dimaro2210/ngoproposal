import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MEMBERS = [
  { 
    id: '1', 
    name: 'Amara Osei', 
    role: 'Founder & Executive Director', 
    col: 1,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    social: { twitter: '#', linkedin: '#' } 
  },
  { 
    id: '2', 
    name: 'Nathalia Nancie', 
    role: 'Programs Manager', 
    col: 2,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    social: { twitter: '#', linkedin: '#' } 
  },
  { 
    id: '3', 
    name: 'Diana Prince', 
    role: 'Health Lead & Nurse', 
    col: 3,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    social: { linkedin: '#', instagram: '#' } 
  },
  { 
    id: '4', 
    name: 'John Emeka', 
    role: 'Logistics & Supply Lead', 
    col: 1,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    social: { linkedin: '#' } 
  },
  { 
    id: '5', 
    name: 'Elizabeth Joe', 
    role: 'Lead Field Coordinator', 
    col: 2,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300',
    social: { twitter: '#', linkedin: '#' } 
  },
  { 
    id: '6', 
    name: 'Albert Flores', 
    role: 'Volunteer Engagement Coordinator', 
    col: 3,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300',
    social: { twitter: '#', linkedin: '#' } 
  }
];

export default function HopeSection() {
  const [hoveredId, setHoveredId] = useState(null);

  const colWidthsClass = {
    1: 'hope-col-1',
    2: 'hope-col-2',
    3: 'hope-col-3'
  };

  return (
    <section className="hope-section section-padding relative overflow-hidden">
      {/* Decorative ambient background flares */}
      <div className="hope-ambient-glow-1" aria-hidden="true"></div>
      <div className="hope-ambient-glow-2" aria-hidden="true"></div>
      <div className="hope-grain" aria-hidden="true"></div>

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="hope-section-header">
          <div className="hope-header-left">
            <div className="hope-tag-row">
              <span className="hope-tag-line"></span>
              <span className="hope-tag-text">MEET OUR FIELD LEADERs</span>
            </div>
            <h2 className="hope-section-title">
              Six hearts behind <br />
              <em className="text-gradient">every single impact.</em>
            </h2>
          </div>
          <p className="hope-header-desc">
            A small, dedicated team working directly across Nigeria's remote villages in water, education, and healthcare operations. Hover a card to meet the leader.
          </p>
        </div>

        <div className="hope-hairline"></div>

        {/* Interactive Grid & List */}
        <div className="hope-showcase">
          
          {/* Left Column Staggered Photo Grid */}
          <div className="hope-photo-grid">
            
            {/* Column 1 */}
            <div className="hope-grid-column col-1">
              {MEMBERS.filter(m => m.col === 1).map(m => {
                const isActive = hoveredId === m.id;
                const isInactive = hoveredId !== null && hoveredId !== m.id;
                const originalIndex = MEMBERS.indexOf(m) + 1;
                return (
                  <div
                    key={m.id}
                    className={`hope-photo-card ${colWidthsClass[1]} ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <img src={m.image} alt={m.name} className="hope-card-img" />
                    <div className="hope-card-overlay"></div>
                    <span className="hope-card-index">0{originalIndex}</span>
                  </div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="hope-grid-column col-2">
              {MEMBERS.filter(m => m.col === 2).map(m => {
                const isActive = hoveredId === m.id;
                const isInactive = hoveredId !== null && hoveredId !== m.id;
                const originalIndex = MEMBERS.indexOf(m) + 1;
                return (
                  <div
                    key={m.id}
                    className={`hope-photo-card ${colWidthsClass[2]} ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <img src={m.image} alt={m.name} className="hope-card-img" />
                    <div className="hope-card-overlay"></div>
                    <span className="hope-card-index">0{originalIndex}</span>
                  </div>
                );
              })}
            </div>

            {/* Column 3 */}
            <div className="hope-grid-column col-3">
              {MEMBERS.filter(m => m.col === 3).map(m => {
                const isActive = hoveredId === m.id;
                const isInactive = hoveredId !== null && hoveredId !== m.id;
                const originalIndex = MEMBERS.indexOf(m) + 1;
                return (
                  <div
                    key={m.id}
                    className={`hope-photo-card ${colWidthsClass[3]} ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                    onMouseEnter={() => setHoveredId(m.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <img src={m.image} alt={m.name} className="hope-card-img" />
                    <div className="hope-card-overlay"></div>
                    <span className="hope-card-index">0{originalIndex}</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column Interactive List */}
          <div className="hope-members-list">
            {MEMBERS.map((m, idx) => {
              const isActive = hoveredId === m.id;
              const isInactive = hoveredId !== null && hoveredId !== m.id;
              return (
                <div
                  key={m.id}
                  className={`hope-member-row ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}
                  onMouseEnter={() => setHoveredId(m.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="hope-member-row-inner">
                    <span className="hope-marker"></span>
                    <span className="hope-name">{m.name}</span>
                    
                    {/* Social links */}
                    <div className="hope-row-socials">
                      {m.social.twitter && (
                        <a href={m.social.twitter} className="hope-social-icon" aria-label="Twitter" onClick={(e) => e.stopPropagation()}>
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {m.social.linkedin && (
                        <a href={m.social.linkedin} className="hope-social-icon" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}>
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                      {m.social.instagram && (
                        <a href={m.social.instagram} className="hope-social-icon" aria-label="Instagram" onClick={(e) => e.stopPropagation()}>
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                    </div>

                    <span className="hope-row-index">0{idx + 1} / 06</span>
                  </div>
                  <p className="hope-role-text">{m.role}</p>
                </div>
              );
            })}
          </div>

        </div>

        <div className="hope-hairline" style={{ marginTop: '4rem' }}></div>

        {/* Footer detail row */}
        <div className="hope-footer-info">
          <span>Index · 01 — 06</span>
          <span className="hope-quote-tag">"You're the hope of others."</span>
          <span>EST. 2019 · LAGOS / FCT ABUJA</span>
        </div>

      </div>
    </section>
  );
}
