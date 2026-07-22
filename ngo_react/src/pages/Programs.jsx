import { Link } from 'react-router-dom'

const programs = [
  {
    id: 1,
    icon: 'fas fa-tree',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=700',
    category: 'Climate Resilience',
    title: 'Green Sokoto Initiative 2026',
    desc: 'Planting 500 drought-resistant indigenous trees (Neem, Baobab, Moringa, Bagaruwa) across 10 sites in Sokoto Metropolis for World Tree Planting Day (June 6, 2026).',
    raised: '₦350,000',
    goal: '₦800,000',
    percent: 44,
    beneficiaries: '2,000+ residents daily',
    states: 'Sokoto North, South, Wamakko',
    tag: '#greensokoto',
  },
  {
    id: 2,
    icon: 'fas fa-shield-alt',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=700',
    category: 'Protection',
    title: 'Protection & Survivor Support',
    desc: 'Providing safe reporting channels, psychosocial support, legal aid referrals, and emergency shelter resources for survivors of abuse and gender-based violence.',
    raised: '₦780,000',
    goal: '₦1,200,000',
    percent: 65,
    beneficiaries: '1,200+ survivors & families',
    states: 'Dange Shuni, Gada, Sokoto South',
    tag: '#protection',
  },
  {
    id: 3,
    icon: 'fas fa-heartbeat',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=700',
    category: 'Health',
    title: 'RMNCAH & Community Health',
    desc: 'Delivering Reproductive, Maternal, Newborn, Child, and Adolescent Health clinics, vaccines, antenatal toolkits, and nutritional support across rural Sokoto LGAs.',
    raised: '₦920,000',
    goal: '₦1,500,000',
    percent: 61,
    beneficiaries: '8,500+ mothers & children',
    states: 'Sokoto State (5 LGAs)',
    tag: '#rmncah',
  },
  {
    id: 4,
    icon: 'fas fa-user-graduate',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700',
    category: 'Education & Prevention',
    title: 'Safe Schools & Social Norm Change',
    desc: 'Conducting interactive workshops on child safety, consent, digital security, and conflict resolution for over 500 adolescents across secondary schools in Sokoto.',
    raised: '₦540,000',
    goal: '₦900,000',
    percent: 60,
    beneficiaries: '500+ adolescents',
    states: 'Sokoto North & South LGAs',
    tag: '#safeschools',
  },
  {
    id: 5,
    icon: 'fas fa-tint',
    image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700',
    category: 'WASH & Hygiene',
    title: 'WASH & Community Hygiene Drive',
    desc: 'Installing clean solar boreholes, sanitation blocks, and hygiene toolkits to prevent waterborne diseases in underserved communities across Sokoto.',
    raised: '₦1,150,000',
    goal: '₦1,800,000',
    percent: 64,
    beneficiaries: '10,000+ residents',
    states: 'Gada, Wamakko, Dange Shuni',
    tag: '#wash',
  },
  {
    id: 6,
    icon: 'fas fa-balance-scale',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=700',
    category: 'Governance & Advocacy',
    title: 'Governance & Policy Advocacy',
    desc: 'Training community safety champions, engaging traditional rulers (Mai Angwan), and advocating for government policies that protect human dignity.',
    raised: '₦610,000',
    goal: '₦1,000,000',
    percent: 61,
    beneficiaries: '50+ trained champions',
    states: 'Sokoto Metropolis',
    tag: '#advocacy',
  },
]

const howWeHelp = [
  { icon: 'fas fa-search-location', step: '01', title: 'Community Assessment', desc: 'Our field officers survey LGAs to identify vulnerable groups, protection risks, and health gaps.' },
  { icon: 'fas fa-project-diagram', step: '02', title: 'Evidence-Based Planning', desc: 'Programs are co-designed with community leaders, traditional rulers (Mai Angwan), and local experts.' },
  { icon: 'fas fa-hand-holding-heart', step: '03', title: 'Direct Field Dispatch', desc: 'Resources, medical supplies, survivor support, and tree planting drives are deployed directly on the ground.' },
  { icon: 'fas fa-chart-line', step: '04', title: 'Monitoring & Guardianship', desc: 'We assign local Tree Guardians and field monitors to ensure sustained, 100% transparent outcomes.' },
]

export default function Programs() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)' }}>
        <div className="container">
          <h1 style={{ color: '#fff' }}>Our Core Focus Areas & Campaigns</h1>
          <p style={{ color: 'rgba(255,255,255,.85)' }}>Saferplace Initiative operates across 6 key pillars to strengthen protection, health, and resilience in Sokoto State.</p>
        </div>
      </section>

      {/* How We Help */}
      <section style={{ background: '#F8FAFC', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Approach</span>
            <h2>How We Deliver Impact</h2>
            <p>A survivor-centered, community-led, and data-driven process across all 5 operational LGAs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {howWeHelp.map((step, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid var(--border-color)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '1rem', right: '1.2rem', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(108, 43, 217, .08)', fontFamily: 'var(--font-display)' }}>{step.step}</span>
                <i className={step.icon} style={{ fontSize: '2rem', color: '#6C2BD9', marginBottom: '1rem', display: 'block' }}></i>
                <h4 style={{ marginBottom: '.5rem' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-header">
            <span>Active Initiatives</span>
            <h2>Support Our Ongoing Programs</h2>
            <p>Every donation directly powers field outreach, survivor protection, child health, and tree planting in Sokoto State.</p>
          </div>
          <div className="programs-grid">
            {programs.map(prog => (
              <div key={prog.id} className="program-card">
                <div className="program-img">
                  <img src={prog.image} alt={prog.title} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#6C2BD9', color: '#fff', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '.3rem .8rem', borderRadius: '20px' }}>
                    {prog.category}
                  </div>
                </div>
                <div className="program-info">
                  <h3>{prog.title}</h3>
                  <p>{prog.desc}</p>

                  {/* Progress Bar */}
                  <div className="cause-bar-bg" style={{ margin: '1rem 0 .5rem' }}>
                    <div className="cause-bar-fill" style={{ width: `${prog.percent}%`, background: '#6C2BD9' }}></div>
                  </div>
                  <div className="cause-numbers" style={{ marginBottom: '1rem' }}>
                    <span className="raised">Raised: {prog.raised}</span>
                    <span className="target">Goal: {prog.goal}</span>
                  </div>

                  {/* Meta Tags */}
                  <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '1.2rem', fontSize: '.8rem', color: 'var(--text-muted)' }}>
                    <span><i className="fas fa-users" style={{ color: '#6C2BD9', marginRight: '.3rem' }}></i>{prog.beneficiaries}</span>
                    <span><i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)', marginRight: '.3rem' }}></i>{prog.states}</span>
                  </div>

                  <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#6C2BD9', borderColor: '#6C2BD9' }}>
                    <i className="fas fa-heart"></i> Support This Initiative
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="stats-section" style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #1E1B4B 100%)' }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card"><h3 style={{ color: '#fff' }}>6<span></span></h3><p style={{ color: 'rgba(255,255,255,.8)' }}>Core Focus Areas</p></div>
            <div className="stat-card"><h3 style={{ color: '#fff' }}>5<span></span></h3><p style={{ color: 'rgba(255,255,255,.8)' }}>LGAs in Sokoto</p></div>
            <div className="stat-card"><h3 style={{ color: '#fff' }}>500<span>+</span></h3><p style={{ color: 'rgba(255,255,255,.8)' }}>Adolescents Reached</p></div>
            <div className="stat-card"><h3 style={{ color: '#fff' }}>500<span>+</span></h3><p style={{ color: 'rgba(255,255,255,.8)' }}>Trees in Green Drive</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container cta-strip-container">
          <h2>Creating safe spaces for every life, everywhere. <br />Partner with Saferplace Initiative today.</h2>
          <Link to="/contact" className="btn-primary" style={{ background: '#6C2BD9', borderColor: '#6C2BD9' }}>Donate Now <i className="fas fa-heart"></i></Link>
        </div>
      </section>
    </>
  )
}

