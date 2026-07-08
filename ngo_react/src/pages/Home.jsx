import React from 'react';
import { Link } from 'react-router-dom';

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
      quote: '"Charius NGO does an exceptional job delivering school learning packs directly to pupils in remote villages. Highly transparent team."',
      name: 'Elizabeth Joe',
      role: 'Founder of KD NGO',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80'
    },
    {
      id: 2,
      quote: '"I supported their clean water solar borehole project last quarter. They kept me updated with pictures and video completions. Professional!"',
      name: 'Esther Howard',
      role: 'Web Designer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80'
    },
    {
      id: 3,
      quote: '"Delivering vaccines and tests directly to the doorsteps of communities that lack general hospitals. This is lifesaving work."',
      name: 'Albert Flores',
      role: 'President of Sales',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80'
    }
  ];

  const news = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600',
      category: 'Water',
      title: 'Your donation means a lot to them. Donate what you can.',
      desc: 'Establishing three solar boreholes to deliver clean drinking water directly to remote gates...',
      date: 'Jan 24, 2026'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
      category: 'Education',
      title: 'Help make their dreams reality. Proper school projects.',
      desc: 'Constructing modern classrooms and distributing textbook learning packs to primary school pupils...',
      date: 'Feb 12, 2026'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600',
      category: 'Health',
      title: 'This can build a proper medical clinic for rural gates.',
      desc: 'Bringing standard vaccines, vaccines clinics, and basic medical checkups directly to families...',
      date: 'Mar 18, 2026'
    }
  ];

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="subtitle">Give them a chance.</span>
              <h1>Give The Child <br />The Gift Of <br />Education.</h1>
              <p>Collectively helping curious minds to lead our developmental projects and build sustainable paths out of poverty.</p>
              <div className="hero-cta">
                <Link to="/contact" className="btn-primary">Join Our Team</Link>
                <div className="avatar-group">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" alt="Team 1" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="Team 2" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="Team 3" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="Team 4" />
                </div>
              </div>
            </div>
            <div className="hero-img-wrap">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800" alt="Smiling Child" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-pill-gallery">
              <div className="pill-img">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400" alt="Education helper" />
              </div>
              <div className="pill-img">
                <img src="https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=400" alt="Girl child smiling" />
              </div>
              <div className="pill-img">
                <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400" alt="Volunteers work" />
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">Welcome to Charius</span>
              <h2>You're the Hope <br />of Others.</h2>
              <p>Our foundation focuses on immediate community development projects. By constructing solar boreholes, deploying mobile vaccine clinics, and delivering educational toolkits, we bring hope to those who need it most.</p>
              
              <div className="about-contact-row">
                <Link to="/about" className="btn-secondary">Discover More</Link>
                <div className="about-call">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <span>Call Us</span>
                    <h4>+(234) 703-443-7910</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            {causes.map(cause => (
              <div key={cause.id} className="cause-card">
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
            {events.map(event => (
              <div key={event.id} className="event-card">
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

          <div className="volunteers-grid">
            {volunteers.map(vol => (
              <div key={vol.id} className="volunteer-profile-card">
                <div className="vol-img-wrap">
                  <img src={vol.image} alt={vol.name} />
                </div>
                <h4>{vol.name}</h4>
                <span>{vol.role}</span>
              </div>
            ))}
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

      {/* ========== CTA STRIP ========== */}
      <section className="cta-strip">
        <div className="container cta-strip-container">
          <h2>Your donation means a lot to them. <br />Donate what you can.</h2>
          <Link to="/contact" className="btn-primary">Donate What You Can <i className="fas fa-heart"></i></Link>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <div className="section-header">
            <span>Testimonial</span>
            <h2>What people say</h2>
            <p>Hear from our active donors, partners, and community leaders who support our impact.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(item => (
              <div key={item.id} className="testimonial-card">
                <i className="fas fa-quote-right quote-icon"></i>
                <p>{item.quote}</p>
                <div className="testimonial-profile">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

          <div className="news-grid">
            {news.map(item => (
              <div key={item.id} className="news-card">
                <div className="news-img-wrap">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="news-body">
                  <span className="news-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="news-date"><i className="far fa-calendar-alt"></i> {item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
