import React from 'react';
import { Link } from 'react-router-dom';
import TestimonialSlider from '../components/TestimonialSlider';
import NewsCarousel from '../components/NewsCarousel';
import TeamStack from '../components/TeamStack';
import HopeSection from '../components/HopeSection';
import CTAReveal from '../components/CTAReveal';

export default function Home() {
  const causes = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=600',
      title: 'The Thirsty are Waiting For Your Help.',
      percent: '65%',
      raised: '₦950,000',
      target: '₦1,500,000'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
      title: 'Changing a lives one meal at a time.',
      percent: '48%',
      raised: '₦380,000',
      target: '₦800,000'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600',
      title: "Let's be one community in this cause.",
      percent: '82%',
      raised: '₦1,640,000',
      target: '₦2,000,000'
    }
  ];

  const events = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=600',
      day: '23',
      month: 'Jan',
      time: '10:00 AM - 4:00 PM',
      location: 'Enugu, Nigeria',
      title: 'Solve The Water Problem Of Nigeria Communities.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
      day: '15',
      month: 'Feb',
      time: '09:00 AM - 1:00 PM',
      location: 'Kaduna, Nigeria',
      title: 'School Support Outreach & Free Textbook Distributions.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600',
      day: '28',
      month: 'Mar',
      time: '08:30 AM - 5:00 PM',
      location: 'Ibadan, Nigeria',
      title: 'Rural Health Awareness & Mobile Care Clinic.'
    }
  ];

  const volunteers = [
    { id: 1, name: 'Maide Maren', role: 'Volunteer', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300' },
    { id: 2, name: 'Nathalia Nancie', role: 'Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300' },
    { id: 3, name: 'Diana Prince', role: 'Nurse / Health Lead', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300' },
    { id: 4, name: 'John Doe', role: 'Logistics Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300' }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Charius NGO does an exceptional job delivering school learning packs directly to pupils in remote villages. Highly transparent team.",
      name: 'Elizabeth Joe',
      affiliation: 'Founder of KD NGO',
      imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
      thumbnailSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'
    },
    {
      id: 2,
      quote: "I supported their clean water solar borehole project last quarter. They kept me updated with pictures and video completions. Professional!",
      name: 'Esther Howard',
      affiliation: 'Web Designer',
      imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600',
      thumbnailSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
    },
    {
      id: 3,
      quote: "Delivering vaccines and tests directly to the doorsteps of communities that lack general hospitals. This is lifesaving work.",
      name: 'Albert Flores',
      affiliation: 'President of Sales',
      imageSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600',
      thumbnailSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
    }
  ];

  const news = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=600',
      category: 'Water',
      title: 'Solar Boreholes Deployed In Remote Kogi Communities',
      desc: 'Three solar-powered boreholes were installed to guarantee safe, clean drinking water directly to over 8,000 residents.',
      date: 'Jan 24, 2026'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
      category: 'Education',
      title: '15,000 Textbooks & Math Kits Distributed To Rural Primary Pupils',
      desc: 'Our education outreach team successfully completed deliveries to primary schools across Kogi and Nasarawa states.',
      date: 'Feb 12, 2026'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600',
      category: 'Health',
      title: 'Mobile Vaccine Clinic Dispatched Across Gombe Villages',
      desc: 'Trained nurses and pharmacists successfully delivered vaccines, malaria tests, and health kits to remote households.',
      date: 'Mar 18, 2026'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600',
      category: 'Women',
      title: 'Vocational Grants & Sew Toolkits Gifted To Osun Mothers',
      desc: '150 rural women graduated from our tailoring and digital literacy workshop, receiving launch micro-grants.',
      date: 'Apr 05, 2026'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600',
      category: 'Food',
      title: 'Emergency Nutrition Aid & School Meals Dispatched In Borno',
      desc: 'Partnering with local farms, we successfully delivered 3,000 packs of emergency food support to displaced households.',
      date: 'May 20, 2026'
    }
  ];

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        {/* Warm light flare background element */}
        <div className="hero-glow-blob"></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-grid">
            
            {/* Left Content Column */}
            <div className="hero-content">
              <div className="hero-award-tag">
                <span>AWARD-WINNING IMPACT</span>
                <i className="fas fa-star" style={{ color: 'var(--primary)', fontSize: '.75rem' }}></i>
              </div>
              <h1 className="hero-title">
                Creating <br />
                <span className="text-gradient">Human Impact</span> <br />
                That Matters
              </h1>
              <p className="hero-description">
                We design and deliver targeted, community-centered developmental interventions in education, clean water, and healthcare — bringing modern resources directly to Nigeria's most underserved populations.
              </p>
              <div className="hero-cta-buttons">
                <Link to="/contact" className="hero-btn-white">
                  Donate Now <i className="fas fa-arrow-right" style={{ marginLeft: '.5rem', fontSize: '.85rem' }}></i>
                </Link>
                <Link to="/about" className="hero-btn-outline">
                  <i className="fas fa-play" style={{ marginRight: '.6rem', fontSize: '.8rem' }}></i> Watch Video
                </Link>
              </div>
            </div>

            {/* Right Metric Cards Column */}
            <div className="hero-cards-col">
              
              {/* Large Metric Panel */}
              <div className="hero-metric-panel">
                <div className="metric-header-row">
                  <div className="metric-icon-wrap">
                    <i className="fas fa-bullseye" style={{ fontSize: '1.25rem', color: '#fff' }}></i>
                  </div>
                  <div>
                    <h3>40K+</h3>
                    <p>Lives Touched & Empowered</p>
                  </div>
                </div>

                <div className="metric-progress-wrap">
                  <div className="progress-label-row">
                    <span>Project Transparency</span>
                    <span>100%</span>
                  </div>
                  <div className="metric-progress-bg">
                    <div className="metric-progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="metric-details-grid">
                  <div className="metric-detail-item">
                    <h4>9+</h4>
                    <span>STATES</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4>100%</h4>
                    <span>VERIFIED</span>
                  </div>
                  <div className="metric-divider"></div>
                  <div className="metric-detail-item">
                    <h4>24/7</h4>
                    <span>DISPATCH</span>
                  </div>
                </div>

                <div className="metric-badges-row">
                  <span className="metric-badge green">
                    <span className="badge-dot"></span> ACTIVE
                  </span>
                  <span className="metric-badge gold">
                    <i className="fas fa-crown" style={{ marginRight: '.3rem', fontSize: '.75rem' }}></i> VERIFIED
                  </span>
                </div>
              </div>

              {/* Smaller Partners Panel */}
              <div className="hero-partners-panel">
                <p className="partners-label">Trusted by Leading Organizations</p>
                <div className="partners-logos">
                  <span><i className="fas fa-hand-holding-heart" style={{ marginRight: '.3rem' }}></i> KD NGO</span>
                  <span><i className="fas fa-shield-alt" style={{ marginRight: '.3rem' }}></i> USAID Partner</span>
                  <span><i className="fas fa-university" style={{ marginRight: '.3rem' }}></i> Rotary Club</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========== HOPE OF OTHERS SECTION ========== */}
      <HopeSection />

      {/* ========== STATS SECTION ========== */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>12<span>+</span></h3>
              <p>Total Campaigns</p>
            </div>
            <div className="stat-card">
              <h3>₦15M<span>+</span></h3>
              <p>Total Fund Raised</p>
            </div>
            <div className="stat-card">
              <h3>250<span>+</span></h3>
              <p>Happy Volunteers</p>
            </div>
            <div className="stat-card">
              <h3>6<span>+</span></h3>
              <p>Years of Fund Raising</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== POPULAR CAUSES ========== */}
      <section className="causes-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Popular Cause</span>
            <h2>Find the popular cause</h2>
            <p>Support any of our active causes below to directly contribute to sustainable developmental projects.</p>
          </div>

          <div className="causes-grid">
            {causes.map((cause, idx) => (
              <div key={cause.id} className="cause-card" data-aos="fade-up" data-delay={String((idx + 1) * 150)}>
                <div className="cause-img">
                  <img src={cause.image} alt={cause.title} />
                </div>
                <div className="cause-body">
                  <h3>{cause.title}</h3>
                  <div className="cause-progress">
                    <div className="cause-bar-bg">
                      <div className="cause-bar-fill" style={{ width: cause.percent }}></div>
                    </div>
                    <div className="cause-numbers">
                      <span className="raised">Raised: {cause.raised}</span>
                      <span className="target">Goal: {cause.target}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Donate Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== UPCOMING EVENTS ========== */}
      <section className="events-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Upcoming Events</span>
            <h2>Join Our Upcoming Events</h2>
            <p>Be part of our community outreach activities. View detail timelines and sign up to support.</p>
          </div>

          <div className="events-grid">
            {events.map((event, idx) => (
              <div key={event.id} className="event-card" data-aos="fade-up" data-delay={String((idx + 1) * 150)}>
                <div className="event-img-wrap">
                  <img src={event.image} alt={event.title} />
                  <div className="event-date-badge">
                    <h4>{event.day}</h4>
                    <span>{event.month}</span>
                  </div>
                </div>
                <div className="event-body">
                  <div className="event-meta">
                    <span><i className="far fa-clock"></i> {event.time}</span>
                    <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                  </div>
                  <h3>{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MEET OUR VOLUNTEERS ========== */}
      <section className="volunteers-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Our Volunteers</span>
            <h2>Meet Our Volunteer Behind the Success Story</h2>
            <p>Our dedicated management team and volunteers who dedicate their time to direct field operations.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <TeamStack members={volunteers} />
          </div>
        </div>
      </section>

      {/* ========== PHOTO ROW ========== */}
      <section className="gallery-row">
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300" alt="Gallery 1" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=300" alt="Gallery 2" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=300" alt="Gallery 3" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=300" alt="Gallery 4" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=300" alt="Gallery 5" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
        <div className="gallery-cell">
          <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300" alt="Gallery 6" />
          <div className="gallery-overlay"><i className="fas fa-expand"></i></div>
        </div>
      </section>

      {/* ========== CTA REVEAL ========== */}
      <CTAReveal />

      {/* ========== TESTIMONIALS ========== */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Testimonial</span>
            <h2>What people say</h2>
            <p>Hear from our active donors, partners, and community leaders who support our impact.</p>
          </div>

          <TestimonialSlider reviews={testimonials} />
        </div>
      </section>

      {/* ========== LATEST NEWS & BLOG ========== */}
      <section className="news-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Blog & News</span>
            <h2>Our Latest News and Articles</h2>
            <p>Read detailed stories of our field outreaches, project completions, and volunteer summits.</p>
          </div>

          <NewsCarousel newsItems={news} />
        </div>
      </section>
    </>
  );
}
