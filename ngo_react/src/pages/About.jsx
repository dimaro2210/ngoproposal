import { Link } from 'react-router-dom'
import TeamStack from '../components/TeamStack'

const team = [
  { name: 'Amara Osei', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300', bio: '12 years in nonprofit leadership across West Africa.' },
  { name: 'Nathalia Nancie', role: 'Programs Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300', bio: 'Expert in rural development and community mobilization.' },
  { name: 'Diana Prince', role: 'Health Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300', bio: 'Registered nurse with a focus on immunization campaigns.' },
  { name: 'John Emeka', role: 'Logistics Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300', bio: 'Coordinating supply chains across 6 Nigerian states.' },
]

const milestones = [
  { year: '2018', title: 'Foundation Established', desc: 'Charius registered as a CAC-approved nonprofit in Abuja with 5 founding members.' },
  { year: '2019', title: 'First Borehole Commissioned', desc: 'Clean water borehole delivered to 1,200 rural residents in Kogi State.' },
  { year: '2021', title: 'Education Drive Launched', desc: 'Distributed 4,000+ learning kits to primary schools across three states.' },
  { year: '2023', title: 'Mobile Health Clinic Deployed', desc: 'Reached 8,000+ patients with vaccines, diagnostics, and free medications.' },
  { year: '2025', title: '₦15M Raised', desc: 'Crossed ₦15 million in total donations from local and diaspora supporters.' },
  { year: '2026', title: 'National Expansion', desc: 'Active programs now running across 9 states in Nigeria.' },
]

const values = [
  { icon: 'fas fa-hands-helping', title: 'Community First', desc: 'Every decision is guided by what best serves the communities we work in, not external agendas.' },
  { icon: 'fas fa-shield-alt', title: 'Transparency', desc: 'Donors receive photo, video, and written proof of every completed project within 7 days.' },
  { icon: 'fas fa-globe-africa', title: 'Sustainability', desc: 'We build solutions that last — clean water systems maintained by trained locals, schools with continued sponsorship.' },
  { icon: 'fas fa-heart', title: 'Compassion', desc: 'We treat every beneficiary with dignity and respect as equal members of our national family.' },
  { icon: 'fas fa-users', title: 'Collaboration', desc: 'We partner with local governments, diaspora groups, and international NGOs to multiply our impact.' },
  { icon: 'fas fa-chart-line', title: 'Impact-Driven', desc: 'We measure success not by funds raised, but by lives directly improved and verified outcomes.' },
]

const partners = [
  'UNICEF Nigeria', 'Federal Ministry of Health', 'Bill & Melinda Gates Foundation',
  'CAC Nigeria', 'Rotary International', 'Nigerian Red Cross',
]

export default function About() {
  return (
    <>
      {/* ========== HERO SECTION (About Page) ========== */}
      <section className="hero">
        {/* Warm light flare background element */}
        <div className="hero-glow-blob"></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-grid">
            
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-award-tag">
                <span>ABOUT OUR FOUNDATION</span>
                <i className="fas fa-heart" style={{ color: 'var(--primary)', fontSize: '.75rem' }}></i>
              </div>
              <h1 className="hero-title">
                Restoring Hope, <br />
                <span className="text-gradient">Empowering Lives</span> <br />
                Across Nigeria
              </h1>
              <p className="hero-description">
                Learn more about our mission, vision, team, and the milestones driving grassroots impact across Nigeria.
              </p>
              <div className="hero-cta-buttons">
                <Link to="/contact" className="hero-btn-white">
                  Donate Now <i className="fas fa-arrow-right" style={{ marginLeft: '.5rem', fontSize: '.85rem' }}></i>
                </Link>
                <a href="#team" className="hero-btn-outline">
                  Meet the Team <i className="fas fa-users" style={{ marginLeft: '.5rem', fontSize: '.85rem' }}></i>
                </a>
              </div>
            </div>

            {/* Right Column: Statistics / Metrics Panel */}
            <div className="hero-cards-col">
              <div className="hero-metric-panel">
                <div className="metric-header-row">
                  <div className="metric-icon-wrap">
                    <i className="fas fa-history" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </div>
                  <div>
                    <h3>6+ Years</h3>
                    <p>of Continuous Field Operations</p>
                  </div>
                </div>

                <div className="metric-progress-wrap">
                  <div className="progress-label-row">
                    <span>National Reach & Verification</span>
                    <span>100%</span>
                  </div>
                  <div className="metric-progress-bg">
                    <div className="metric-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="metric-details-grid">
                  <div className="metric-detail-item">
                    <h4>15K+</h4>
                    <span>STUDENTS</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4>40+</h4>
                    <span>WELLS</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4>8K+</h4>
                    <span>PATIENTS</span>
                  </div>
                </div>

                <div className="metric-badges-row">
                  <span className="metric-badge green">
                    <span className="badge-dot"></span> 9 STATES
                  </span>
                  <span className="metric-badge gold">
                    <i className="fas fa-crown" style={{ marginRight: '.3rem', fontSize: '.75rem' }}></i> CAC APPROVED
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-block">
        <div className="container">
          <div className="about-grid-content">
            <div className="about-img">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" alt="About Charius" />
            </div>
            <div className="about-text">
              <span style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.15em', display: 'block', marginBottom: '.6rem' }}>Our Story</span>
              <h2>Established to Close the Gap</h2>
              <p>Charius Foundation was born from a simple observation: rural communities in Nigeria were being left behind. Schools without books, villages without clean water, and families without access to basic healthcare — all within a country with immense wealth.</p>
              <p>Our founders decided to act. Starting with a single borehole in Kogi State in 2019, we have grown into a nationally recognized nonprofit running simultaneous education, water, and health programs across 9 Nigerian states.</p>
              <p>We operate on a strict <strong>100% transparency guarantee</strong> — every naira donated is accounted for with photographic and written proof delivered to donors.</p>

              <div className="stats-row">
                <div className="stat-item"><h3>15K+</h3><p>Students Educated</p></div>
                <div className="stat-item"><h3>40+</h3><p>Wells Commissioned</p></div>
                <div className="stat-item"><h3>8K+</h3><p>Patients Treated</p></div>
                <div className="stat-item"><h3>9</h3><p>States Active</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: '#F3F6F5', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Purpose</span>
            <h2>Mission & Vision</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2.5rem' }}>
            <div className="cause-card" style={{ padding: '2.5rem', minWidth: 0 }}>
              <i className="fas fa-bullseye" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.2rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>To deliver targeted, community-centered, and verifiable developmental interventions in education, clean water, and healthcare — directly to Nigeria's most underserved populations.</p>
            </div>
            <div className="cause-card" style={{ padding: '2.5rem', minWidth: 0 }}>
              <i className="fas fa-eye" style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.2rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '1rem' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>A Nigeria where geography does not determine destiny — where every child has access to quality education, every home has clean water, and every community has basic medical care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span>What We Stand For</span>
            <h2>Our Core Values</h2>
            <p>Six principles that guide every decision, every project, and every partnership we build.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => (
              <div key={i} className="cause-card" style={{ padding: '2rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <i className={v.icon} style={{ fontSize: '1.6rem', color: 'var(--secondary)', background: 'rgba(12,124,89,.08)', padding: '1rem', borderRadius: '10px', flexShrink: 0 }}></i>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '.5rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ background: '#F3F6F5' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Journey</span>
            <h2>Milestones & Achievements</h2>
            <p>A timeline of key moments that defined our growth from a local idea to a national nonprofit.</p>
          </div>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--border-color)', transform: 'translateX(-50%)' }}></div>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '2rem', position: 'relative' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem', maxWidth: '320px', boxShadow: 'var(--shadow)', position: 'relative' }}>
                  <span style={{ background: 'var(--primary)', color: '#fff', padding: '.3rem .8rem', borderRadius: '20px', fontSize: '.8rem', fontWeight: 700, display: 'inline-block', marginBottom: '.6rem' }}>{m.year}</span>
                  <h4 style={{ marginBottom: '.4rem' }}>{m.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section id="team" className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span>Leadership</span>
            <h2>Meet the Team</h2>
            <p>The dedicated people who lead our operations, manage our volunteers, and drive our impact daily.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <TeamStack members={team} />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ background: '#F3F6F5', padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Network</span>
            <h2>Partners & Affiliates</h2>
            <p>Organizations and institutions that trust and collaborate with Charius Foundation.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {partners.map((p, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem 2rem', fontWeight: 600, fontSize: '.9rem', color: 'var(--text-dark)' }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container cta-strip-container">
          <h2>Join our community of change-makers today.</h2>
          <Link to="/contact" className="btn-primary">Get Involved <i className="fas fa-arrow-right"></i></Link>
        </div>
      </section>
    </>
  )
}
