'use client';

import { useState } from 'react';
import { useLeadContext } from '@/contexts/LeadContext';

export default function GymContact() {
  const lead = useLeadContext();
  const [form, setForm] = useState({ name: '', email: '', website: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section spad">
      <div className="container">
        <div className="contact-row">
          {/* Contact Info */}
          <div className="contact-col">
            <div className="section-title contact-title">
              <span>Contact Us</span>
              <h2>GET IN TOUCH</h2>
            </div>
            <div className="contact-widget">
              <div className="cw-text">
                <i className="fa fa-map-marker" />
                <p>Your City, Your Country</p>
              </div>
              <div className="cw-text">
                <i className="fa fa-mobile" />
                <ul>
                  <li>{lead.phoneNumber || '000-000-0000'}</li>
                </ul>
              </div>
              <div className="cw-text email">
                <i className="fa fa-envelope" />
                <p>contact@{lead.slug || 'yourbusiness'}.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-col">
            {submitted ? (
              <div className="contact-success">
                <i className="fa fa-check-circle" />
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="primary-btn btn-normal">
                  Send Another
                </button>
              </div>
            ) : (
              <div className="leave-comment">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="website"
                    placeholder="Website (optional)"
                    value={form.website}
                    onChange={handleChange}
                  />
                  <textarea
                    name="comment"
                    placeholder="Your message..."
                    value={form.comment}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="primary-btn">Submit</button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.069761554938!2d-74.2175599360452!3d40.767139456514954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254b5958982c3%3A0xb6ab3931055a2612!2sEast%20Orange%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sbd!4v1581710470843!5m2!1sen!2sbd"
            height="450"
            style={{ border: 0, width: '100%' }}
            allowFullScreen
            loading="lazy"
            title="Location Map"
          />
        </div>
      </div>
    </section>
  );
}
