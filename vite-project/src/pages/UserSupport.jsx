import React from 'react';

const UserSupportPage = () => {
  return (
    <div className="page support-page">
      <section className="support-hero">
        <div className="support-hero-content">
          <h1>Wsparcie klienta</h1>
          <p>Zwroty, dostawa i najczęściej zadawane pytania — wszystko w jednym miejscu.</p>
        </div>
      </section>

      <main className="support-content">
        <section className="support-section returns">
          <h2>Zwroty</h2>
          <p>
            Jeśli z jakiegoś powodu nie jesteś zadowolony z zamówienia, masz 14 dni na zwrot od daty otrzymania paczki.
            Produkty spożywcze przyjmujemy jedynie w przypadku błędu wysyłki lub wad. Prosimy o kontakt z obsługą klienta w celu ustalenia szczegółów.
          </p>
        </section>

        <section className="support-section delivery">
          <h2>Dostawa</h2>
          <p>
            Dostarczamy zamówienia w ciągu 24 godzin na terenie miasta oraz na ustalonych trasach poza miastem.
            Dostawy są realizowane w chłodzonych warunkach, aby zachować świeżość produktów.
          </p>
        </section>

        <section className="support-section faq">
          <h2>FAQ</h2>
          <div className="faq-item">
            <h3>Jak złożyć zamówienie?</h3>
            <p>Wybierz produkty i dodaj je do koszyka, przejdź do koszyka i potwierdź zamówienie.</p>
          </div>

          <div className="faq-item">
            <h3>W jakich godzinach dostarczacie?</h3>
            <p>Dostawy odbywają się między 8:00 a 20:00. Dokładna godzina zależy od trasy dostaw.</p>
          </div>

          <div className="faq-item">
            <h3>Jak zgłosić problem z zamówieniem?</h3>
            <p>Skontaktuj się poprzez email <strong>kontakt@warzywex.pl</strong> lub telefon +48 123 456 789. Podaj numer zamówienia.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserSupportPage;
