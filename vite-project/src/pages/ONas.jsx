
import React from 'react';

const ONasPage = () => (
  <div className="page">
    <h1>O Nas</h1>
    <div className="about-content">
      <div className="about-section">
        <h2>Nasza historia</h2>
        <p>
          Warzywniaka to rodzinne gospodarstwo z wieloletnią tradycją. Od pokoleń uprawiamy 
          warzywa i owoce, dbając o najwyższą jakość i ekologiczne metody produkcji.
        </p>
      </div>

      <div className="about-section">
        <h2>Nasze wartości</h2>
        <ul>
          <li>🌱 Ekologia i szacunek dla natury</li>
          <li>❤️ Pasja do hodowli</li>
          <li>🤝 Uczciwe podejście do klienta</li>
          <li>⭐ Jakość ponad wszystko</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Kontakt</h2>
        <p>📧 Email: kontakt@warzywniaka.pl</p>
        <p>📞 Telefon: +48 123 456 789</p>
        <p>📍 Adres: ul. Polna 15, 12-345 Wieś Zielona</p>
      </div>
    </div>
  </div>
);

export default ONasPage;