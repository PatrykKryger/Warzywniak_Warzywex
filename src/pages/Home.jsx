import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = ({ setCurrentPage }) => {
  const [currentOpinionIndex, setCurrentOpinionIndex] = useState(0);

  const opinions = [
    {
      text: "Najlepsze warzywa jakie kiedykolwiek kupiłem. Świeżość jest niespotykanego poziomu!",
      author: "Pani Maria K.",
      rating: 5
    },
    {
      text: "Szybka dostawa i naprawdę ekologiczne produkty. Polecam wszystkim!",
      author: "Pan Tomasz W.",
      rating: 5
    },
    {
      text: "Ceny nie drażnią portfela, a jakość jest zawsze na wysokim poziomie.",
      author: "Pani Anna P.",
      rating: 5
    },
    {
      text: "Warzywex zmienił moje podejście do jedzenia. Teraz tylko kupuję u nich.",
      author: "Pan Krzysztof M.",
      rating: 5
    },
    {
      text: "Świeżość produktów to nie żart - widać od razu różnicę w stosunku do sklepu.",
      author: "Pani Ewa S.",
      rating: 5
    },
    {
      text: "Obsługa na poziomie, produkty zawsze świeże, dostawa punktualna. Top!",
      author: "Pan Dariusz K.",
      rating: 5
    },
  ];

  const nextOpinion = () => {
    setCurrentOpinionIndex((prev) => (prev + 1) % opinions.length);
  };

  const prevOpinion = () => {
    setCurrentOpinionIndex((prev) => (prev - 1 + opinions.length) % opinions.length);
  };

  return (
    <div className="page home-page">
      {/* FULL-WIDTH HERO */}
      <section className="hero-full">
        <div className="hero-overlay"></div>
        <div className="hero-full-content">
          <h1>Świeże warzywa i owoce<br/>prosto od rolnika</h1>
          <p>Ekologiczne produkty najwyższej jakości, dostarczone do Twojej drzwi w 24 godziny</p>
          <div className="hero-buttons">
            <button className="hero-btn primary" onClick={() => setCurrentPage('produkty')}>
              <ShoppingBag size={20} /> Rozpocznij zakupy
            </button>
            <button className="hero-btn secondary" onClick={() => setCurrentPage('promocje')}>
              <TrendingUp size={20} /> Nasze promocje
            </button>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS (moved from O nas) */}
      <section className="certifications-section home-certifications">
        <div className="certifications-container">
          <div className="certifications-head">
            <h2>Nasze certyfikaty i wyróżnienia</h2>
            <p className="cert-sub">Dowód jakości i odpowiedzialnej produkcji — sprawdź, co stoi za naszymi produktami.</p>
          </div>

          <div className="certifications-grid">
            <div className="cert-card">
              <div className="cert-badge">EU</div>
              <h3>Rolnictwo Ekologiczne EU</h3>
              <p>Certyfikat potwierdzający uprawy zgodne ze standardami ekologicznymi UE.</p>
            </div>

            <div className="cert-card">
              <div className="cert-badge">BIO</div>
              <h3>BIO Cert Polska</h3>
              <p>Krajowa certyfikacja jakości i kontroli ekologicznej naszych produktów.</p>
            </div>

            <div className="cert-card">
              <div className="cert-badge">AW</div>
              <h3>Najlepszy Produkt 2023</h3>
              <p>Wyróżnienie za najwyższą jakość w kategorii świeżych produktów.</p>
            </div>

            <div className="cert-card">
              <div className="cert-badge">GO</div>
              <h3>Przyjazny dla środowiska</h3>
              <p>Nagroda za zieloną logistykę i minimalizację odpadów.</p>
            </div>
          </div>
 
        </div>
      </section>

      {/* WHY CHOOSE US - IMAGE + TEXT (half image layout) */}
      <section className="why-us-section why-us-full">
        <div className="why-us-bg">
          <img src="/src/assets/images/why-us.svg" alt="Nasze uprawy - Warzywex" />
        </div>
        <div className="why-us-content">
          <div className="why-inner">
            <div className="why-left">
              <h2>Dlaczego klienci wybierają Warzywex</h2>
              <p className="lead">Jesteśmy małym zespołem z pasją do zdrowej żywności — dajemy gwarancję świeżości, transparentności i lokalnego wsparcia.</p>
              <p className="why-text">Kupując u nas otrzymujesz produkty z bezpośrednich źródeł, kontrolowane jakościowo i pakowane z myślą o środowisku. Zależy nam na rzetelności — dlatego informujemy o pochodzeniu i certyfikatach każdego produktu.</p>
            </div>

            <aside className="why-right" aria-hidden={false}>
              <ul className="why-highlights">
                <li><strong>Świeżość:</strong> Zrywane blisko terminu wysyłki.</li>
                <li><strong>Lokale źródła:</strong> współpraca z zaufanymi rolnikami.</li>
                <li><strong>Certyfikaty:</strong> potwierdzenie ekologicznych praktyk.</li>
              </ul>
              <div className="why-cta-row">
                <button className="nav-btn full" onClick={() => setCurrentPage('o-nas')}>Dowiedz się więcej o nas</button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* OPINIONS CAROUSEL */}
      <section className="opinions-carousel-section">
        <h2>Opinie naszych klientów</h2>
        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={prevOpinion}>
            <ChevronLeft size={28} />
          </button>
          
          <div className="opinion-card-large">
            <div className="opinion-stars">{'⭐'.repeat(opinions[currentOpinionIndex].rating)}</div>
            <p className="opinion-text">"{opinions[currentOpinionIndex].text}"</p>
            <p className="opinion-author">— {opinions[currentOpinionIndex].author}</p>
          </div>
          
          <button className="carousel-btn next" onClick={nextOpinion}>
            <ChevronRight size={28} />
          </button>
        </div>
        
        <div className="carousel-dots">
          {opinions.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentOpinionIndex ? 'active' : ''}`}
              onClick={() => setCurrentOpinionIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Removed sections after opinions per request (no benefits/newsletter here) */}
    </div>
  );
};

export default Home;