import React from 'react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/2349117622762?text=Hi%20Saferplace%20Initiative%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20programs." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}

