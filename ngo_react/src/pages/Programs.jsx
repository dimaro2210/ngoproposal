import { Link } from 'react-router-dom'

const programs = [
  {
    id: 1,
    icon: 'fas fa-book-open',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700',
    category: 'Education',
    title: 'Rural Education Support',
    desc: 'Providing books, learning toolkits, bags, and modern writing materials to primary school pupils in rural schools. We target schools in areas with no government curriculum support.',
    raised: '₦1,640,000',
    goal: '₦2,000,000',
    percent: 82,
    beneficiaries: '15,000+ pupils',
    states: 'Kogi, Benue, Nasarawa',
    tag: '#education',
  },
  {
    id: 2,
    icon: 'fas fa-tint',
    image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=700',
    category: 'Water',
    title: 'Clean Water Initiatives',
    desc: 'Sinking solar-powered boreholes, installing hand pumps, and building sanitation units in remote communities to guarantee year-round access to safe, clean drinking water.',
    raised: '₦950,000',
    goal: '₦1,500,000',
    percent: 65,
    beneficiaries: '12,000+ residents',
    states: 'Kogi, Niger, Kebbi',
    tag: '#water',
  },
  {
    id: 3,
    icon: 'fas fa-heartbeat',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=700',
    category: 'Health',
    title: 'Rural Medical Outreach',
    desc: 'Deploying mobile pharmacies and trained nurses to deliver vaccines, malaria rapid tests, blood pressure checks, and basic surgical dressings to residents with no hospital access.',
    raised: '₦380,000',
    goal: '₦800,000',
    percent: 48,
    beneficiaries: '8,000+ patients',
    states: 'Plateau, Taraba, Gombe',
    tag: '#health',
  },
  {
    id: 4,
    icon: 'fas fa-utensils',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=700',
    category: 'Food',
    title: 'School Feeding Program',
    desc: 'Providing free nutritious meals to children in rural schools so that hunger does not become a barrier to attendance. Partner cooks are hired locally from the community.',
    raised: '₦720,000',
    goal: '₦1,200,000',
    percent: 60,
    beneficiaries: '3,200+ pupils daily',
    states: 'Enugu, Anambra, Imo',
    tag: '#food',
  },
  {
    id: 5,
    icon: 'fas fa-female',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700',
    category: 'Women',
    title: "Women's Empowerment Drive",
    desc: 'Funding vocational training, micro-grants, and cooperative groups for rural women — equipping mothers with skills in tailoring, soap-making, catering, and digital literacy.',
    raised: '₦540,000',
    goal: '₦900,000',
    percent: 60,
    beneficiaries: '1,800+ women',
    states: 'Oyo, Osun, Ekiti',
    tag: '#women',
  },
  {
    id: 6,
    icon: 'fas fa-home',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=700',
    category: 'Shelter',
    title: 'Emergency Shelter Relief',
    desc: 'Providing temporary and semi-permanent housing, blankets, and household essentials to families displaced by floods, fire, and other natural disasters across northern Nigeria.',
    raised: '₦290,000',
    goal: '₦700,000',
    percent: 41,
    beneficiaries: '620+ households',
    states: 'Borno, Adamawa, Yobe',
    tag: '#shelter',
  },
]

const howWeHelp = [
  { icon: 'fas fa-search-location', step: '01', title: 'Identify Communities', desc: 'Our field officers survey underserved areas to confirm need, population size, and project feasibility.' },
  { icon: 'fas fa-project-diagram', step: '02', title: 'Plan the Project', desc: 'A detailed implementation plan is prepared, costed, and reviewed by our board and donors.' },
  { icon: 'fas fa-truck', step: '03', title: 'Deploy Resources', desc: 'Supplies, equipment, and qualified personnel are dispatched directly to the target community.' },
  { icon: 'fas fa-camera', step: '04', title: 'Document Impact', desc: 'Every milestone is photographed and reported, with updates sent directly to all donors.' },
]

export default function Programs() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Active Programs</h1>
          <p>Six ongoing community development initiatives you can directly fund and support right now.</p>
        </div>
      </section>

      {/* How We Help */}
      <section style={{ background: '#F3F6F5', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span>Our Process</span>
            <h2>How We Deliver Help</h2>
            <p>A transparent, 4-step process from identifying a need to verifying its fulfillment.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {howWeHelp.map((step, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid var(--border-color)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '1rem', right: '1.2rem', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(12,124,89,.07)', fontFamily: 'var(--font-display)' }}>{step.step}</span>
                <i className={step.icon} style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem', display: 'block' }}></i>
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
            <span>Active Campaigns</span>
            <h2>Choose a Program to Support</h2>
            <p>Every program below has a verified funding target. Your donation goes directly to field operations.</p>
          </div>
          <div className="programs-grid">
            {programs.map(prog => (
              <div key={prog.id} className="program-card">
                <div className="program-img">
                  <img src={prog.image} alt={prog.title} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--primary)', color: '#fff', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '.3rem .8rem', borderRadius: '20px' }}>
                    {prog.category}
                  </div>
                </div>
                <div className="program-info">
                  <h3>{prog.title}</h3>
                  <p>{prog.desc}</p>

                  {/* Progress Bar */}
                  <div className="cause-bar-bg" style={{ margin: '1rem 0 .5rem' }}>
                    <div className="cause-bar-fill" style={{ width: `${prog.percent}%` }}></div>
                  </div>
                  <div className="cause-numbers" style={{ marginBottom: '1rem' }}>
                    <span className="raised">Raised: {prog.raised}</span>
                    <span className="target">Goal: {prog.goal}</span>
                  </div>

                  {/* Meta Tags */}
                  <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '1.2rem', fontSize: '.8rem', color: 'var(--text-muted)' }}>
                    <span><i className="fas fa-users" style={{ color: 'var(--primary)', marginRight: '.3rem' }}></i>{prog.beneficiaries}</span>
                    <span><i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)', marginRight: '.3rem' }}></i>{prog.states}</span>
                  </div>

                  <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <i className="fas fa-heart"></i> Donate to This Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card"><h3>6<span>+</span></h3><p>Active Programs</p></div>
            <div className="stat-card"><h3>₦15M<span>+</span></h3><p>Total Funded</p></div>
            <div className="stat-card"><h3>9<span></span></h3><p>States Covered</p></div>
            <div className="stat-card"><h3>40K<span>+</span></h3><p>Lives Touched</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container cta-strip-container">
          <h2>Not sure which program to support? <br />Even a small donation changes lives.</h2>
          <Link to="/contact" className="btn-primary">Donate Now <i className="fas fa-heart"></i></Link>
        </div>
      </section>
    </>
  )
}
