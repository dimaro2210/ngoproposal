import React from 'react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/2348060249813?text=Hi%20Charius%2C%20I%20would%20love%20to%20know%20more%20about%20your%20NGO%20impact." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
