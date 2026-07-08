import React, { useState } from 'react';

const WEB3FORMS_KEY = '073e0963-fd22-4886-8a40-5ccd11749be3';

const faqs = [
  {
    question: 'How does Charius guarantee transparency?',
    answer: 'We post photo and video updates of every community intervention directly to our Gallery and social media. In addition, donors who register their email receive direct receipt receipts, procurement lists, and project completion reports.'
  },
  {
    question: 'Can I volunteer for field activities?',
    answer: 'Absolutely! Select "Volunteer Registration" in the form dropdown below. Our logistics lead will add you to our state-level WhatsApp groups for upcoming outreaches in your state.'
  },
  {
    question: 'Do you accept international donations?',
    answer: 'Yes, we accept global bank transfers and card payments. For international donations, please contact our support at donate@chariusngo.org or use our bank wire details listed below.'
  },
  {
    question: 'Are there administrative deductions from donations?',
    answer: 'No. Our administrative expenses are entirely funded by corporate grants and our board of directors. 100% of public individual donations go directly to buying textbooks, boreholes, medicine, and food.'
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
      data.append('subject', `NGO Website: ${form.subject}`);
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
      <section className="page-header">
        <div className="container">
          <h1>Contact Our Office</h1>
          <p>Get in touch regarding volunteer registrations, programs, or partnerships.</p>
        </div>
      </section>

      {/* Main Blocks */}
      <section className="contact-block">
        <div className="container">
          <div className="contact-grid-content">

            {/* Contact Details & Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Send us a message or reach out via our official phone lines or office locations. We respond within 24 hours.</p>

              <div className="info-cards">
                <div className="info-card">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email Support</h4>
                    <p>info@chariusngo.org</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <h4>Call Center</h4>
                    <p>+(234) 806-024-9813</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Headquarters Office</h4>
                    <p>Plot 482, Constitution Ave, Central Business District, Abuja, Nigeria</p>
                  </div>
                </div>
                <div className="info-card">
                  <i className="fas fa-map-marked-alt"></i>
                  <div>
                    <h4>Lagos Office Liaison</h4>
                    <p>12, Alfred Rewane Road, Ikoyi, Lagos State, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Direct Bank Account Donation Card */}
              <div className="cause-card" style={{ padding: '1.8rem', marginTop: '2rem', borderLeft: '5px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--text-dark)' }}>
                  <i className="fas fa-university" style={{ color: 'var(--primary)', marginRight: '0.5rem' }}></i> 
                  Direct Bank Transfers (Nigeria)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>You can make donations directly to our registered nonprofit corporate account:</p>
                <div style={{ background: 'var(--bg-light)', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <strong>Bank:</strong> Access Bank PLC <br />
                  <strong>Account Name:</strong> Charius Foundation for Rural Aid <br />
                  <strong>Account Number:</strong> 1204859302 <br />
                  <strong>TIN Number:</strong> 29485903-0001
                </div>
              </div>

              {/* Maps Wrapper */}
              <div className="map-wrapper" style={{ marginTop: '2rem' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.81832014777!2d7.382025732152865!3d9.055565543477154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4da0db13c!2sAbuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Charius office location"
                />
              </div>
            </div>

            {/* Contact and Registration Form */}
            <div className="contact-form-card">
              <h3>Send a Message</h3>
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
                    <option value="Volunteer Registration">Volunteer Registration</option>
                    <option value="Project Support / Donation">Project Support / Donation</option>
                    <option value="Corporate Partnership">Corporate Partnership</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message" name="message" rows="5" required
                    placeholder="Type your message or volunteer application details here..."
                    value={form.message} onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={sending}
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '6px' }}
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
      <section style={{ background: '#F3F6F5', padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span>FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about donations, volunteer work, and operations.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="cause-card" 
                style={{ 
                  padding: '1.2rem 1.8rem', 
                  cursor: 'pointer',
                  borderColor: openFaq === idx ? 'var(--secondary)' : 'var(--border-color)'
                }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-dark)' }}>{faq.question}</h4>
                  <i className={`fas ${openFaq === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: 'var(--secondary)' }}></i>
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
            <i className="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. Our representative will contact you shortly within 24 hours.</p>
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
