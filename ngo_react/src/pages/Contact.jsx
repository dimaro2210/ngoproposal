import React, { useState } from 'react';

const WEB3FORMS_KEY = '073e0963-fd22-4886-8a40-5ccd11749be3';

const faqs = [
  {
    question: 'Where is Saferplace Initiative based and registered?',
    answer: 'Saferplace Initiative is an officially registered non-profit organization in Nigeria under CAC/IT/NO 7571193, based in Sokoto State with official registration under the Ministry of Budget and Economic Planning, Sokoto.'
  },
  {
    question: 'Which LGAs does Saferplace Initiative operate in?',
    answer: 'Our current operational coverage spans 5 Local Government Areas in Sokoto State: Dange Shuni, Gada, Sokoto North, Sokoto South, and Wamakko.'
  },
  {
    question: 'How can I support or sponsor the Green Sokoto Initiative 2026?',
    answer: 'You can support the World Tree Planting Day drive by donating towards seedlings (₦500 per tree), manure, or digging tool sets. Select "Project Support / Donation" in the contact form below or reach out directly.'
  },
  {
    question: 'Can I volunteer as a community responder or Tree Guardian?',
    answer: 'Yes! We actively train community volunteers, caregivers, and youth leaders as first responders and Tree Guardians. Fill out the volunteer form below to join our team.'
  }
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const data = new FormData();
      data.append('access_key', WEB3FORMS_KEY);
      data.append('subject', `Saferplace Initiative Web Inquiry: ${form.subject}`);
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('phone', form.phone);
      data.append('type', form.subject);
      data.append('message', form.message);

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)' }}>
        <div className="container">
          <h1 style={{ color: '#fff' }}>Contact Saferplace Initiative</h1>
          <p style={{ color: 'rgba(255,255,255,.85)' }}>Get in touch for partnerships, volunteer registration, or project support in Sokoto State.</p>
        </div>
      </section>

      {/* Main Blocks */}
      <section className="contact-block">
        <div className="container">
          <div className="contact-grid-content">

            {/* Contact Details & Info */}
            <div className="contact-info">
              <h2>Reach Our Field Office</h2>
              <p>We welcome inquiries from community members, government ministries, corporate sponsors, and international partners.</p>

              <div className="info-cards">
                <div className="info-card">
                  <i className="fas fa-envelope" style={{ color: '#6C2BD9' }}></i>
                  <div>
                    <h4>Official Email</h4>
                    <p>saferplaceinitiativeng@gmail.com</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-phone-alt" style={{ color: '#6C2BD9' }}></i>
                  <div>
                    <h4>Phone & WhatsApp</h4>
                    <p>+234-(0)-9117622762</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-user-shield" style={{ color: '#6C2BD9' }}></i>
                  <div>
                    <h4>Board Member Enquiry</h4>
                    <p>Mr. Kolawole Abidemi: 08135441406</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-map-marker-alt" style={{ color: '#6C2BD9' }}></i>
                  <div>
                    <h4>Headquarters Address</h4>
                    <p>Sokoto Metropolis, Sokoto State, Northwest Nigeria</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-certificate" style={{ color: '#6C2BD9' }}></i>
                  <div>
                    <h4>CAC Registration</h4>
                    <p>CAC/IT/NO 7571193</p>
                  </div>
                </div>
              </div>

              {/* Direct Bank Account Donation Card */}
              <div className="cause-card" style={{ padding: '1.8rem', marginTop: '2rem', borderLeft: '5px solid #6C2BD9' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--text-dark)' }}>
                  <i className="fas fa-university" style={{ color: '#6C2BD9', marginRight: '0.5rem' }}></i> 
                  Direct Bank Transfers (Nigeria)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>You can make contributions directly to our official corporate non-profit account:</p>
                <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <strong>Account Name:</strong> Saferplace Initiative <br />
                  <strong>CAC Registration:</strong> CAC/IT/NO 7571193 <br />
                  <strong>Bank:</strong> Access Bank PLC / Zenith Bank PLC <br />
                  <strong>Account Number:</strong> 1204859302 <br />
                  <strong>Official Website:</strong> www.saferplaceinitiative.ng
                </div>
              </div>

              {/* Maps Wrapper */}
              <div className="map-wrapper" style={{ marginTop: '2rem' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62325.26388484964!2d5.195048248632812!3d13.062691500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b91d2eb34d4ad3%3A0x8e833bf4ddae4066!2sSokoto%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sokoto office location"
                />
              </div>
            </div>

            {/* Contact and Registration Form */}
            <div className="contact-form-card">
              <h3 style={{ color: '#1E293B' }}>Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text" id="name" name="name" required
                    placeholder="Full Name"
                    value={form.name} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email" id="email" name="email" required
                    placeholder="name@example.com"
                    value={form.email} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel" id="phone" name="phone"
                    placeholder="e.g. +234..."
                    value={form.phone} onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Nature of Inquiry</label>
                  <select
                    id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    style={{
                      backgroundColor: 'var(--bg-light)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-dark)',
                      fontSize: '0.95rem'
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Green Sokoto Initiative Sponsorship">Green Sokoto Initiative Sponsorship</option>
                    <option value="Volunteer / Tree Guardian Application">Volunteer / Tree Guardian Application</option>
                    <option value="Survivor Support Referral">Survivor Support Referral</option>
                    <option value="Government & Institutional Partnership">Government & Institutional Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message" name="message" rows="5" required
                    placeholder="Type your message or project application details here..."
                    value={form.message} onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={sending}
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '6px', background: '#6C2BD9', borderColor: '#6C2BD9' }}
                >
                  {sending
                    ? <><i className="fas fa-circle-notch fa-spin"></i> Sending...</>
                    : 'Submit Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ background: '#F8FAFC', padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span>FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our programs, governance, and volunteer operations in Sokoto State.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="cause-card" 
                style={{ 
                  padding: '1.2rem 1.8rem', 
                  cursor: 'pointer',
                  borderColor: openFaq === idx ? '#6C2BD9' : 'var(--border-color)'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-dark)' }}>{faq.question}</h4>
                  <i className={`fas ${openFaq === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#6C2BD9' }}></i>
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {success && (
        <div className="modal-overlay" onClick={() => setSuccess(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <i className="fas fa-check-circle" style={{ color: '#6C2BD9' }}></i>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting Saferplace Initiative. Our Sokoto field office representative will get back to you shortly.</p>
            <button
              className="btn-secondary"
              onClick={() => setSuccess(false)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

