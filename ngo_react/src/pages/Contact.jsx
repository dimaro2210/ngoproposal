import { useState } from 'react'

const WEB3FORMS_KEY = '073e0963-fd22-4886-8a40-5ccd11749be3'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const data = new FormData()
      data.append('access_key', WEB3FORMS_KEY)
      data.append('subject', 'New Contact Inquiry from Charius Website')
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('phone', form.phone)
      data.append('message', form.message)

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        alert('Submission failed. Please try again.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact Our Office</h1>
          <p>Get in touch regarding volunteer registrations, programs, or partnerships.</p>
        </div>
      </section>

      <section className="contact-block">
        <div className="container">
          <div className="contact-grid-content">

            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Send us a message or reach out via our official phone lines or office locations. We respond within 24 hours.</p>

              <div className="info-cards">
                <div className="info-card">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email Support</h4>
                    <p>contact@chariusngo.org</p>
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
                    <h4>Headquarters</h4>
                    <p>Abuja, Federal Capital Territory, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="map-wrapper">
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

            {/* Contact Form */}
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
                  <label htmlFor="message">Message Details</label>
                  <textarea
                    id="message" name="message" rows="5" required
                    placeholder="Type your message here..."
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
  )
}
