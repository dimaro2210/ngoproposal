import React from 'react';

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About Our Foundation</h1>
          <p>Learn more about our mission, vision, and the team driving grassroots impact across Nigeria.</p>
        </div>
      </section>

      <section className="about-block">
        <div className="container">
          <div className="about-grid-content">
            <div className="about-img">
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" alt="About CareForce" />
            </div>
            <div className="about-text">
              <h2>Our Story & Journey</h2>
              <p>CareForce Foundation was established to tackle developmental gaps in rural communities. We realized that local schools, clean water, and standard medical diagnostics were often out of reach for remote areas.</p>
              <p>Our focus is to deliver targeted, verified, and community-centered developmental solutions that directly empower families, mothers, and students.</p>
              
              <div className="stats-row">
                <div className="stat-item">
                  <h3>15K+</h3>
                  <p>Students Educated</p>
                </div>
                <div className="stat-item">
                  <h3>40+</h3>
                  <p>Clean Wells Commissioned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
