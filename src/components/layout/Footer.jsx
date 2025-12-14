import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <Leaf size={32} />
              <span>Warzywex</span>
            </div>
            <p className="footer-description">
              Świeże warzywa i owoce prosto od rolnika do Twojego stołu.
              Ekologiczne, wysokiej jakości produkty każdego dnia.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Nawigacja</h3>
            <ul className="footer-links">
              <li><a href="#home">Strona główna</a></li>
              <li><a href="#produkty">Produkty</a></li>
              <li><a href="#promocje">Promocje</a></li>
              <li><a href="#o-nas">O nas</a></li>
            </ul>
          </div>

          {/* Services removed per request */}

          {/* Contact */}
          <div className="footer-section">
            <h3>Kontakt</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <div>
                  <p>ul. Polna 15</p>
                  <p>12-345 Wieś Zielona</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <p>+48 123 456 789</p>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <p>kontakt@warzywex.pl</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Warzywex. Wszystkie prawa zastrzeżone.</p>
          <div className="footer-policies">
            <a href="#privacy">Polityka prywatności</a>
            <a href="#terms">Warunki użytkowania</a>
            <a href="#cookies">Polityka cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;