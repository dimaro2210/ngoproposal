import React from 'react';
import { Link } from 'react-router-dom';

export default function Programs() {
  const causes = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
      title: 'Rural Education Support',
      desc: 'Providing books, learning toolkits, bags, and modern writing materials to primary school pupils in rural schools.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=600',
      title: 'Clean Water Initiatives',
      desc: 'Sinking boreholes and setting up sanitation units in remote communities to guarantee access to clean drinking water.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600',
      title: 'Rural Medical Outreach',
      desc: 'Delivering mobile pharmacies, basic health tests, malaria treatments, and immunization assistance directly to residents.'
    }
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Our Active Programs</h1>
          <p>Explore the ongoing community development projects that you can support today.</p>
        </div>
      </section>

      <section className="programs-block">
        <div className="container">
          <div className="programs-grid">
            {causes.map(program => (
              <div key={program.id} className="program-card">
                <div className="program-img">
                  <img src={program.image} alt={program.title} />
                </div>
                <div className="program-info">
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                  <Link to="/contact" className="btn-primary">Support Program</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
