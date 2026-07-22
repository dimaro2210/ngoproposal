import { useRef } from 'react'
import { Link } from 'react-router-dom'
import TeamStack from '../components/TeamStack'

const team = [
  { name: 'Ejiegbu Chinomso Prince', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300', bio: 'Directing community protection, governance, and organizational development in Sokoto State.' },
  { name: 'Mr. Kolawole Abidemi', role: 'Board Member & Strategic Advisor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300', bio: 'Strategic oversight and community partnerships lead. Phone: 08135441406.' },
  { name: 'Dr. Fatima Usman', role: 'RMNCAH & Community Health Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300', bio: 'Specialist in maternal, child, and adolescent health outreach.' },
  { name: 'Ibrahim Abubakar', role: 'Climate & Field Operations Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300', bio: 'Coordinating the Green Sokoto Initiative 2026 and community tree guardians.' },
]

const milestones = [
  { year: 'CAC Registration', title: 'Official Registration', desc: 'Registered with CAC Nigeria under CAC/IT/NO 7571193 as a social protection nonprofit.' },
  { year: 'State Integration', title: 'Ministry Approval', desc: 'Submitted introduction and operational registration to the Ministry of Budget & Economic Planning, Sokoto State.' },
  { year: '5 LGAs', title: 'Coverage Expansion', desc: 'Active operations across Dange Shuni, Gada, Sokoto North, Sokoto South, and Wamakko LGAs.' },
  { year: '500+ Youth', title: 'Safe Schools Outreach', desc: 'Reached 500+ adolescents across schools with child protection, consent, and safety education.' },
  { year: '50 Responders', title: 'Community First Responders', desc: 'Trained 50 community volunteers as survivor support responders in local neighborhoods.' },
  { year: 'June 2026', title: 'Green Sokoto Initiative', desc: 'Launching the World Tree Planting Day campaign to plant 500 indigenous trees across Sokoto.' },
]

const focusPillars = [
  { icon: 'fas fa-shield-alt', title: 'Protection & Survivor Support', desc: 'Providing safe reporting channels, psychosocial counseling, and emergency referrals for survivors.' },
  { icon: 'fas fa-book-reader', title: 'Prevention & Social Norm Change', desc: 'School and community workshops on child protection, consent, digital security, and peacebuilding.' },
  { icon: 'fas fa-heartbeat', title: 'Community Health & Child Wellbeing', desc: 'RMNCAH programs delivering antenatal support, child nutrition, and mobile health services.' },
  { icon: 'fas fa-leaf', title: 'Climate Environmental Resilience', desc: 'Green Sokoto Initiative 2026 tree planting drives addressing heat stress and desertification.' },
  { icon: 'fas fa-balance-scale', title: 'Governance & Policy Advocacy', desc: 'Working with traditional leaders (Mai Angwan) and ministries to enforce inclusive, safe laws.' },
  { icon: 'fas fa-chart-line', title: 'Monitoring & Community Data Systems', desc: 'Data-driven impact measurement, SMART evidence logging, and community feedback loops.' },
]

const partners = [
  'Sokoto State Ministry of Budget & Economic Planning',
  'Sokoto State Ministry of Environment',
  'Usmanu Danfodiyo University Sokoto (UDUS)',
  'RUWASSA Sokoto',
  'BUA Cement Sokoto',
  'Sokoto Green Movement',
]

export default function About() {
  const teamRef = useRef(null)

  return (
    <>
      {/* ========== HERO SECTION (About Page) ========== */}
      <section className="hero" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)' }}>
        <div className="hero-glow-blob"></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-grid">
            
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-award-tag" style={{ background: 'rgba(255,255,255,.15)', borderColor: 'rgba(255,255,255,.3)' }}>
                <span style={{ color: '#fff' }}>CAC/IT/NO 7571193 · SOKOTO STATE</span>
                <i className="fas fa-heart" style={{ color: '#A78BFA', fontSize: '.75rem' }}></i>
              </div>
              <h1 className="hero-title" style={{ color: '#fff' }}>
                Saferplace <br />
                <span className="text-gradient">Initiative</span>
              </h1>
              <p className="hero-description" style={{ color: 'rgba(255,255,255,.85)' }}>
                Dedicated to strengthening community safety, resilience, and social protection for vulnerable populations, particularly women, children, and young people in Sokoto State.
              </p>
              <div className="hero-cta-buttons">
                <Link to="/contact" className="hero-btn-white">
                  Get In Touch <i className="fas fa-arrow-right" style={{ marginLeft: '.5rem', fontSize: '.85rem' }}></i>
                </Link>
                <a
                  href="#team"
                  className="hero-btn-outline"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,.4)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    teamRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Meet Leadership <i className="fas fa-users" style={{ marginLeft: '.5rem', fontSize: '.85rem' }}></i>
                </a>
              </div>
            </div>

            {/* Right Column: Statistics / Metrics Panel */}
            <div className="hero-cards-col">
              <div className="hero-metric-panel" style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.2)' }}>
                <div className="metric-header-row">
                  <div className="metric-icon-wrap" style={{ background: '#6C2BD9' }}>
                    <i className="fas fa-shield-alt" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </div>
                  <div>
                    <h3 style={{ color: '#fff' }}>5 LGAs</h3>
                    <p style={{ color: 'rgba(255,255,255,.8)' }}>Active Coverage in Sokoto</p>
                  </div>
                </div>

                <div className="metric-progress-wrap">
                  <div className="progress-label-row">
                    <span style={{ color: 'rgba(255,255,255,.9)' }}>Community Protection & Integrity</span>
                    <span style={{ color: '#A78BFA' }}>100%</span>
                  </div>
                  <div className="metric-progress-bg">
                    <div className="metric-progress-fill" style={{ width: '100%', background: '#6C2BD9' }}></div>
                  </div>
                </div>

                <div className="metric-details-grid">
                  <div className="metric-detail-item">
                    <h4 style={{ color: '#fff' }}>500+</h4>
                    <span style={{ color: 'rgba(255,255,255,.7)' }}>STUDENTS</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4 style={{ color: '#fff' }}>50+</h4>
                    <span style={{ color: 'rgba(255,255,255,.7)' }}>CHAMPIONS</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4 style={{ color: '#fff' }}>6</h4>
                    <span style={{ color: 'rgba(255,255,255,.7)' }}>PILLARS</span>
                  </div>
                </div>

                <div className="metric-badges-row">
                  <span className="metric-badge green">
                    <span className="badge-dot"></span> CAC REGISTERED
                  </span>
                  <span className="metric-badge gold">
                    <i className="fas fa-crown" style={{ marginRight: '.3rem', fontSize: '.75rem' }}></i> SOKOTO BASED
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
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" alt="Saferplace Initiative Team" />
            </div>
            <div className="about-text">
              <span style={{ color: '#6C2BD9', fontWeight: 700, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.15em', display: 'block', marginBottom: '.6rem' }}>Who We Are</span>
              <h2>Building Safer Communities Through Empowerment</h2>
              <p>Saferplace Initiative is a registered non-profit organization based in Sokoto State, Nigeria (CAC/IT/NO 7571193), dedicated to strengthening community safety, resilience, and social protection for vulnerable populations, particularly women, children, and young people.</p>
              <p>Through evidence-informed programming, advocacy, and strategic partnerships, we work to prevent violence, promote health wellbeing, and foster inclusive governance across Sokoto State.</p>

              <div className="stats-row">
                <div className="stat-item"><h3 style={{ color: '#6C2BD9' }}>500+</h3><p>Adolescents Reached</p></div>
                <div className="stat-item"><h3 style={{ color: '#6C2BD9' }}>50</h3><p>First Responders</p></div>
                <div className="stat-item"><h3 style={{ color: '#6C2BD9' }}>5</h3><p>Sokoto LGAs Covered</p></div>
                <div className="stat-item"><h3 style={{ color: '#6C2BD9' }}>6</h3><p>Operational Pillars</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: '#F8FAFC', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Foundation</span>
            <h2>Vision & Mission Statements</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2.5rem' }}>
            <div className="cause-card" style={{ padding: '2.5rem', borderTop: '4px solid #6C2BD9' }}>
              <i className="fas fa-eye" style={{ fontSize: '2.5rem', color: '#6C2BD9', marginBottom: '1.2rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                A safer, more equitable society where women, children, and vulnerable populations live free from violence, exclusion, and preventable harm.
              </p>
            </div>
            <div className="cause-card" style={{ padding: '2.5rem', borderTop: '4px solid var(--secondary)' }}>
              <i className="fas fa-bullseye" style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.2rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '1rem', color: '#1E293B' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                To prevent violence, strengthen protective systems, empower communities, and deliver responsive support services that uphold dignity, safety, and social justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Focus Areas */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span>What We Do</span>
            <h2>Our 6 Core Focus Areas</h2>
            <p>Comprehensive protection and health pillars guiding our interventions in Sokoto State.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {focusPillars.map((v, i) => (
              <div key={i} className="cause-card" style={{ padding: '2rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <i className={v.icon} style={{ fontSize: '1.6rem', color: '#6C2BD9', background: 'rgba(108, 43, 217, 0.08)', padding: '1rem', borderRadius: '10px', flexShrink: 0 }}></i>
                <div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '.5rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational LGAs Coverage */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="section-header">
            <span>Field Reach</span>
            <h2>Current Operational LGAs</h2>
            <p>Our direct community-led operations span 5 Local Government Areas in Sokoto State.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {['Dange Shuni LGA', 'Gada LGA', 'Sokoto North LGA', 'Sokoto South LGA', 'Wamakko LGA'].map((lga, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.8rem', boxShadow: 'var(--shadow)' }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#6C2BD9', marginBottom: '0.8rem', display: 'block' }}></i>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B' }}>{lga}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Sokoto State</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <span>Progress & Verification</span>
            <h2>Milestones & Impact</h2>
            <p>Key operational milestones defining our work for women and child health in Sokoto State.</p>
          </div>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--border-color)', transform: 'translateX(-50%)' }}></div>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '2rem', position: 'relative' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem', maxWidth: '340px', boxShadow: 'var(--shadow)', position: 'relative' }}>
                  <span style={{ background: '#6C2BD9', color: '#fff', padding: '.3rem .8rem', borderRadius: '20px', fontSize: '.8rem', fontWeight: 700, display: 'inline-block', marginBottom: '.6rem' }}>{m.year}</span>
                  <h4 style={{ marginBottom: '.4rem' }}>{m.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section ref={teamRef} id="team" className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span>Leadership</span>
            <h2>Meet Our Executive Team</h2>
            <p>Dedicated directors, advisors, and field leads guiding Saferplace Initiative.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <TeamStack members={team} />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ background: '#F8FAFC', padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Institutional Support</span>
            <h2>Partners & Affiliates</h2>
            <p>Government ministries, academic bodies, and local stakeholders collaborating with us.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {partners.map((p, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem 1.8rem', fontWeight: 600, fontSize: '.9rem', color: 'var(--text-dark)' }}>
                <i className="fas fa-check-circle" style={{ color: '#6C2BD9', marginRight: '0.5rem' }}></i>{p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container cta-strip-container">
          <h2>Creating safe spaces for every life, everywhere.</h2>
          <Link to="/contact" className="btn-primary" style={{ background: '#6C2BD9', borderColor: '#6C2BD9' }}>Join Us Today <i className="fas fa-arrow-right"></i></Link>
        </div>
      </section>
    </>
  )
}

