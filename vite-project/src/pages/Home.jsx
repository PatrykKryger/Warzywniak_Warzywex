import React from 'react';

const Home = ({ setCurrentPage }) => (
  <div className="page">
    <section className="hero">
      <div className="hero-content">
        <h1>Świeże warzywa i owoce prosto od rolnika</h1>
        <p>Ekologiczne produkty najwyższej jakości. Odkryj smak prawdziwej żywności.</p>
        <div className="hero-buttons">
          <button className="hero-btn primary" onClick={() => setCurrentPage('produkty')}>Zobacz produkty</button>
          <button className="hero-btn secondary" onClick={() => setCurrentPage('promocje')}>Nasze promocje</button>
        </div>
      </div>
    </section>

    <section className="features">
      <h2>Dlaczego my?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>100% Ekologiczne</h3>
          <p>Wszystkie produkty pochodzą z certyfikowanych upraw ekologicznych</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚜</div>
          <h3>Prosto od rolnika</h3>
          <p>Zrywamy warzywa i owoce tuż przed dostawą do Ciebie</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Najwyższa jakość</h3>
          <p>Starannie selekcjonujemy każdy produkt</p>
        </div>
      </div>
    </section>

    <section className="cta">
      <h2>Dołącz do naszej społeczności</h2>
      <p>Ponad 5000 zadowolonych klientów codziennie wybiera nasze produkty</p>
    </section>
  </div>
);

export default Home;