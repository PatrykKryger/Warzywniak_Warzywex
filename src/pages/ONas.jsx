import React from 'react';

const ONasPage = () => (
  <div className="page about-page">
    {/* HERO */}
    <section className="about-hero">
      <div className="about-hero-content">
        <h1>O nas</h1>
        <p>Ponad 20 lat doświadczenia w ekologicznym rolnictwie</p>
      </div>
    </section>

    {/* STORY */}
    <section className="about-section story-section">
      <div className="story-content">
        <div className="story-text">
          <h2>Nasza historia</h2>
          <p>
            Warzywex powstał z pasji do tradycyjnego rolnictwa i miłości do natury. Nasze gospodarstwo rodzinne funkcjonuje od ponad 20 lat, 
            przekazując wiedzę i doświadczenie z pokolenia na pokolenie.
          </p>
          <p>
            Zaczęliśmy od małych sadzonek i wielkich marzeń. Dziś dostarczamy świeże warzywa i owoce do setek domów. 
            Każdy nasz produkt to świadectwo pracy, dedykacji i miłości do tego, co robimy.
          </p>
          <p>
            Naszą misją jest pokazać, że jedzenie może być zdrowe, smaczne i dostępne - bez kompromisu na jakość.
          </p>
        </div>
        <div className="story-image">
          <div className="image-placeholder">🌾</div>
        </div>
      </div>
    </section>

    {/* PRODUCTION PROCESS */}
    <section className="about-section production-section">
      <h2>Jak przebiega nasza produkcja</h2>
      <div className="production-steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-image">🌱</div>
          <h3>Przygotowanie gruntu</h3>
          <p>Gruntownie przygotowujemy glebę, wzbogacając ją naturalnymi nawozami. Kontrolujemy pH i skład mineralny.</p>
        </div>
        
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-image">🌿</div>
          <h3>Wysiew i pielęgnacja</h3>
          <p>Nasadzamy rośliny w odpowiednim czasie. Zajmujemy się regularnym podlewaniem i naturalną ochroną przed szkodnikami.</p>
        </div>
        
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-image">🥬</div>
          <h3>Wzrost i dojrzewanie</h3>
          <p>Pozwalamy roślinom rosnąć naturalnym tempem, bez przyspieszaczy. Obserwujemy każdą roślinę indywidualnie.</p>
        </div>
        
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-image">✋</div>
          <h3>Ręczny zbiór</h3>
          <p>Zbieramy owoce i warzywa ręcznie, w dniu dostawy. Każdy produkt wybieramy z największą starannością.</p>
        </div>
        
        <div className="step">
          <div className="step-number">5</div>
          <div className="step-image">❄️</div>
          <h3>Szybkie chłodzenie</h3>
          <p>Tuż po zbiorze produkty trafiają do chłodziarki. Zachowujemy świeżość i wszystkie wartości odżywcze.</p>
        </div>
        
        <div className="step">
          <div className="step-number">6</div>
          <div className="step-image">🚚</div>
          <h3>Dostawa do Ciebie</h3>
          <p>Pakujemy wszystko w ekologiczne opakowania i dostarczamy w ciągu 24 godzin, chłodzone i bezpieczne.</p>
        </div>
      </div>
    </section>

    {/* VALUES removed per request */}

    {/* TEAM */}
    <section className="about-section team-section">
      <h2>Nasz zespół</h2>
      <div className="team-grid">
        <div className="team-member">
          <div className="member-avatar">👨‍🌾</div>
          <h3>Jan Kowalski</h3>
          <p className="member-role">Główny rolnik</p>
          <p className="member-bio">30 lat doświadczenia w ekologicznym rolnictwie. Autorem naszych innowacyjnych metod uprawy.</p>
        </div>
        
        <div className="team-member">
          <div className="member-avatar">👩‍💼</div>
          <h3>Maria Kowalska</h3>
          <p className="member-role">Kierownik operacji</p>
          <p className="member-bio">Opiekuje się logistyką i zapewnia, że każdy produkt dociera do Ciebie w idealnym stanie.</p>
        </div>
        
        <div className="team-member">
          <div className="member-avatar">👨‍🌾</div>
          <h3>Piotr Nowak</h3>
          <p className="member-role">Specjalista jakości</p>
          <p className="member-bio">Gwarantuje, że każdy produkt spełnia nasze wysokie standardy kontroli jakości.</p>
        </div>
      </div>
    </section>

    {/* Certifications moved to main page */}

    {/* Contact CTA removed per request */}
  </div>
);

export default ONasPage;