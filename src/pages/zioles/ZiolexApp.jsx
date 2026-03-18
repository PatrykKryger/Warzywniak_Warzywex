import React, { useState, useEffect } from 'react';
import { Skull, Wine, Cigarette, Shield, Zap, Eye, Lock, AlertTriangle, Ghost } from 'lucide-react';

const ZiolexApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState('');
  const [password, setPassword] = useState('');
  const [showVirus, setShowVirus] = useState(false);
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [pendingCheckoutProduct, setPendingCheckoutProduct] = useState(null);
  const [checkoutDetails, setCheckoutDetails] = useState({ card: '', expiry: '', cvv: '' });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [thankYouOrder, setThankYouOrder] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({ address: '', city: '', postal: '' });
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [showHerbStorm, setShowHerbStorm] = useState(false);
  const [showDataStolenAnimation, setShowDataStolenAnimation] = useState(false);

  const ziolexUsersKey = 'zioles_users';

  const loadUsers = () => JSON.parse(localStorage.getItem(ziolexUsersKey) || '[]');
  const saveUsers = (users) => localStorage.setItem(ziolexUsersKey, JSON.stringify(users));

  const triggerVirus = () => {
    setShowVirus(true);
    setTimeout(() => {
      setShowVirus(false);
      window.location.href = '/';
    }, 15000);
  };

  const triggerHerbStorm = (duration = 2500) => {
    setShowHerbStorm(true);
    setTimeout(() => {
      setShowHerbStorm(false);
    }, duration);
  };

  const handleRegister = () => {
    const name = registerName.trim();
    const email = registerEmail.trim().toLowerCase();
    const pass = password.trim();

    if (!name || !email || !pass) {
      alert('Wypełnij wszystkie pola rejestracji.');
      return;
    }

    const users = loadUsers();
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert('Konto o tym emailu już istnieje.');
      return;
    }

    const newUser = { name, email, password: pass };
    users.push(newUser);
    saveUsers(users);
    setUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogin = () => {
    const email = loginAttempt.trim().toLowerCase();
    const pass = password.trim();
    const users = loadUsers();

    const found = users.find(u => u.email === email && u.password === pass);
    if (found) {
      setUser(found);
      setIsLoggedIn(true);
      setCurrentPage('home');
      setLoginAttempt('');
      setPassword('');
      if (pendingCheckoutProduct) {
        setCheckoutProduct(pendingCheckoutProduct);
        setPendingCheckoutProduct(null);
      }
      return;
    }

    // Błędne logowanie - wirus i wyrzucenie ze strony.
    triggerVirus();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
    setRedirectCountdown(null);
    setShowHerbStorm(false);
  };

  const startCheckout = (product) => {
    if (!isLoggedIn) {
      setPendingCheckoutProduct(product);
      setCurrentPage('stolen');
      triggerHerbStorm(4000);
      return;
    }

    setCheckoutProduct(product);
    setPaymentStatus(null);
    setCheckoutDetails({ card: '', expiry: '', cvv: '' });
  };

  const cancelCheckout = () => {
    setCheckoutProduct(null);
    setPaymentStatus(null);
    setThankYouOrder(null);
    setRedirectCountdown(null);
  };

  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown <= 0) {
      window.location.href = '/';
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown]);

  useEffect(() => {
    if (['stolen', 'dataStolen'].includes(currentPage)) {
      triggerHerbStorm(4000);
    }
  }, [currentPage]);

  const submitPayment = () => {
    const { card, expiry, cvv } = checkoutDetails;
    if (!card || !expiry || !cvv) {
      alert('Uzupełnij dane karty.');
      return;
    }

    setPaymentStatus('processing');

    setTimeout(() => {
      setPaymentStatus('completed');
      setThankYouOrder({
        product: checkoutProduct,
        amount: checkoutProduct?.price || 0
      });
      setRedirectCountdown(15);
    }, 2000);
  };

  const darkProducts = [
    {
      id: 1,
      name: "Whisky 'Diabelski Oddech'",
      price: 299.99,
      category: 'alkohol',
      image: '🥃',
      description: 'Destylat z piekielnych głębin. Pociąga duszę w otchłań.',
      warning: 'Nie dla słabych serc. Zawiera esencje demonów.'
    },
    {
      id: 2,
      name: 'Kokaina Premium',
      price: 999.99,
      category: 'narkotyki',
      image: '💎',
      description: 'Biały proszek z kolumbijskich podziemi. Energia z zaświatów.',
      warning: 'Legalna tylko w krainie cieni. DEA nie zatwierdza.'
    },
    {
      id: 3,
      name: 'Futra z Wilkołaków',
      price: 1999.99,
      category: 'futrzarstwo',
      image: '🐺',
      description: 'Skóra przemienionych. Ciepło z pełnią księżyca.',
      warning: 'PETA będzie wściekła. Wilkołaki też.'
    },
    {
      id: 4,
      name: 'Wino z Krwi Wampirów',
      price: 499.99,
      category: 'alkohol',
      image: '🧛',
      description: 'Czerwony nektar nieśmiertelności. Wieczny młodość w kieliszku.',
      warning: 'Może przemienić w wampira. Albo zabić.'
    },
    {
      id: 5,
      name: 'Papierosy z Ziół Demonów',
      price: 89.99,
      category: 'używki',
      image: '🚬',
      description: 'Mieszanka z piekielnych ogrodów. Dym otwiera bramy piekieł.',
      warning: 'Rak to najmniejszy problem. Dusza też może ulec.'
    },
    {
      id: 6,
      name: 'Narkotyki Syntetyczne',
      price: 399.99,
      category: 'narkotyki',
      image: '💊',
      description: 'Chemia z laboratorium szaleńca. Rzeczywistość się rozpływa.',
      warning: 'FDA mówi NIE. Ale kto ich słucha?'
    },
    {
      id: 7,
      name: 'Broń z Czarnego Rynku',
      price: 2999.99,
      category: 'broń',
      image: '🔫',
      description: 'Pistolet z podziemia. Kule z poświęconego srebra.',
      warning: 'ATF śni o tym, żeby nas złapać. Nie daj się.'
    },
    {
      id: 8,
      name: 'Futro z Jednorożców',
      price: 4999.99,
      category: 'futrzarstwo',
      image: '🦄',
      description: 'Magiczna skóra. Jedyny sposób na schwytanie tęczy.',
      warning: 'Jednorożce są chronione. Ale kto ich słucha?'
    },
    {
      id: 9,
      name: 'Rausch z Czarnego Stawu',
      price: 1299.99,
      category: 'alkohol',
      image: '🧴',
      description: 'Płynny sen z jeziora pełnego kości. Wypij, a zapomnisz imiona wszystkich.',
      warning: 'Może powodować utratę pamięci i głosy z innych wymiarów.'
    },
    {
      id: 10,
      name: 'Syrup z Krwi Cerberusa',
      price: 799.99,
      category: 'narkotyki',
      image: '🩸',
      description: 'Słodki kontrabandowy eliksir, który sprawia, że noc staje się wieczna.',
      warning: 'Nie używać w obecności ognia. Może przyciągać bestie.'
    },
    {
      id: 11,
      name: 'Kolekcja Złowrogich Mask',
      price: 2599.99,
      category: 'gadżety',
      image: '🎭',
      description: 'Maski z rytuałów, które odmienią twój wygląd i nastrój.',
      warning: 'Mogą obudzić osoby, które lepiej byłoby zostawić w grobie.'
    },
    {
      id: 12,
      name: 'Tonik z Tkanki Czarownicy',
      price: 1899.99,
      category: 'kosmetyki',
      image: '🧴',
      description: 'Eliksir upiększający, który kosztuje duszę za każdym użyciem.',
      warning: 'Może spowodować gwałtowne zmiany osobowości.'
    }
  ];

  const employees = [
    { name: 'Don Vito "Czaszka"', role: 'Szef Operacji', specialty: 'Alkohol & Spirytualia', icon: '💀' },
    { name: 'Lady Nyxa', role: 'Mistrzyni Cieni', specialty: 'Futra & Obuwie', icon: '🖤' },
    { name: 'Prof. Malachai', role: 'Alchemik Nocny', specialty: 'Narkotyki & Syntetyki', icon: '🧪' },
    { name: 'Contessa Vermillion', role: 'Kustoszka Sekretu', specialty: 'Wina & Nektary', icon: '🌙' },
    { name: 'The Phantom', role: 'Szef Logistyki', specialty: 'Dystrybucja Niknąca', icon: '👻' },
    { name: 'Scarlett Raven', role: 'Dyrektor Marketingu', specialty: 'Propozycje & Zmowy', icon: '🦅' }
  ];

  const renderPage = () => {
    if (showVirus) {
      return (
        <div className="virus-screen">
          <div className="virus-content">
            <div className="skull-animation">
              <Skull size={100} className="skull-icon" />
            </div>
            <h1 className="virus-title">SYSTEM ZAINFEKOWANY</h1>
            <p className="virus-message">
              Twoje dane zostały skradzione przez demony ziół prowansalskich!
            </p>
            <div className="herbs-animation">
              <span className="herb">🌿</span>
              <span className="herb">🌱</span>
              <span className="herb">🌾</span>
              <span className="herb">🍃</span>
            </div>
            <p className="virus-warning">
              Twoje konto zostało zhakowane. Wszystkie dane wysłane do NSA, KGB i Illuminati.
            </p>
            <div className="loading-bar">
              <div className="loading-fill"></div>
            </div>
          </div>
        </div>
      );
    }

    if (showDataStolenAnimation) {
      return (
        <div className="data-stolen-animation">
          <div className="data-page-herbs-left">
            <span className="spinning-herb">🌿</span>
          </div>
          <div className="data-page-herbs-right">
            <span className="spinning-herb">🌿</span>
          </div>
          <div className="stolen-text">DANE SKRADZIONE</div>
          <div className="herb-storm">
            {Array.from({length: 100}, (_, i) => (
              <span key={i} className="herb" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${1 + Math.random() * 4}rem`,
                transform: `rotate(${Math.random() * 360}deg)`,
                color: Math.random() > 0.5 ? '#ff0000' : '#8b0000'
              }}>🌿</span>
            ))}
          </div>
        </div>
      );
    }

    switch(currentPage) {
      case 'home':
        return (
          <div className="zioles-home">
            <div className="hero-section">
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <h1 className="hero-title">
                  <Skull size={60} />
                  ZIÓLEX
                  <Ghost size={60} />
                </h1>
                <p className="hero-subtitle">
                  Sklep z zaświatów. Produkty, których nie znajdziesz w normalnym świecie.
                </p>
                <div className="warning-banner">
                  <AlertTriangle size={24} />
                  <span>UWAGA: Wszystkie produkty są całkowicie nielegalne i niebezpieczne dla zdrowia oraz duszy.</span>
                </div>
                <button className="cta-button" onClick={() => setCurrentPage('products')}>
                  <Eye size={20} />
                  Zobacz nasze towary
                </button>
              </div>
            </div>

            <div className="features-section">
              <h2>Dlaczego Ziółex?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <Shield size={40} />
                  <h3>Tajemnica</h3>
                  <p>Twoje zakupy pozostają w absolutnej tajemnicy. Nawet przed tobą samym.</p>
                </div>
                <div className="feature-card">
                  <Zap size={40} />
                  <h3>Wysoka Jakość</h3>
                  <p>Tylko najlepsze produkty z podziemia. Przetestowane na demonach.</p>
                </div>
                <div className="feature-card feature-clickable" onClick={() => setCurrentPage('delivery')}>
                  <Lock size={40} />
                  <h3>Bezpieczna Dostawa</h3>
                  <p>
                    Twoje dane są zbierane i zapisywane w formacie, który trudno będzie odczytać.
                    Im więcej danych, tym większe szanse, że przesyłka trafi tam, gdzie ma trafić.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="zioles-products">
            <h1>Nasze Produkty</h1>
            <div className="products-grid">
              {darkProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <span className="emoji">{product.image}</span>
                    <div className="product-overlay">
                      <AlertTriangle size={24} />
                      <span>NIELEGALNE</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <p className="warning">{product.warning}</p>
                    <div className="product-footer">
                      <span className="price">{product.price.toFixed(2)} zł</span>
                      <span className="category">{product.category}</span>
                    </div>
                    <div className="product-actions">
                      <button className="buy-button" onClick={() => startCheckout(product)}>
                        Kup teraz
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="zioles-about">
            <div className="about-section-hero">
              <div className="scrolling-text-container">
                <div className="scrolling-text">
                  <span>ZIÓLEX - Gdzie Sny Stają Się Ciemnościami • ZIÓLEX - Gdzie Sny Stają Się Ciemnościami • ZIÓLEX - Gdzie Sny Stają Się Ciemnościami • </span>
                </div>
              </div>
              
              <div className="about-description">
                <p className="about-intro-text">
                  Witaj w czarnym sercu handlu alternatywnego. Ziólex to nie zwykły sklep - to portał do świata, gdzie normalne reguły nie obowiązują.
                </p>
                <p className="about-quote">
                  "Jeśli obawiasz się tego, czego tu szukasz - to dobry początek."
                </p>
              </div>
            </div>

            <div className="about-team-section">
              <h2>Nasi Operacyjni</h2>
              <div className="team-grid-zioles">
                {employees.map((emp, idx) => (
                  <div key={idx} className="team-card-zioles">
                    <div className="team-icon">{emp.icon}</div>
                    <h3>{emp.name}</h3>
                    <p className="team-role">{emp.role}</p>
                    <p className="team-specialty">{emp.specialty}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'login':
        if (isLoggedIn) {
          return (
            <div className="zioles-login">
              <div className="login-form">
                <h1>Witaj w strefie VIP</h1>
                <p className="login-warning">
                  <AlertTriangle size={20} />
                  Masz dostęp do tajnych zapasów Ziółex.
                </p>
                <p>Witaj, <strong>{user?.name}</strong>. Twoje konto jest gotowe.</p>
                <div className="login-actions">
                  <button className="login-button" onClick={() => setCurrentPage('products')}>
                    <Eye size={20} />
                    Przejdź do produktów
                  </button>
                  <button className="btn-cancel" onClick={handleLogout}>
                    Wyloguj
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="zioles-login">
            <div className="login-form">
              <h1>{isRegistering ? 'Rejestracja' : 'Logowanie'}</h1>
              <p className="login-warning">
                <AlertTriangle size={20} />
                Wpisz dane, a my wyciągniemy je z Ciebie.
              </p>
              {isRegistering && (
                <div className="form-group">
                  <label>Imię</label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Twoje imię..."
                  />
                </div>
              )}
              {isRegistering && (
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="email@przykład.pl"
                  />
                </div>
              )}
              {!isRegistering && (
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={loginAttempt}
                    onChange={(e) => setLoginAttempt(e.target.value)}
                    placeholder="email@przykład.pl"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Hasło</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Twoje hasło..."
                />
              </div>
              <button
                onClick={isRegistering ? handleRegister : handleLogin}
                className="login-button"
              >
                <Lock size={20} />
                {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
              </button>
              <p className="login-note">
                {isRegistering
                  ? 'Po rejestracji możesz użyć swoich danych w kolejnych wizytach.'
                  : 'Jeśli podasz złe dane, system usunie Cię z portalu w 15 sekund.'}
              </p>
              <button
                className="toggle-auth-btn"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setLoginAttempt('');
                  setPassword('');
                  setRegisterName('');
                  setRegisterEmail('');
                }}
              >
                {isRegistering ? 'Masz już konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'}
              </button>
            </div>
          </div>
        );

      case 'delivery':
        return (
          <div className="zioles-delivery">
            <h1>Bezpieczna Dostawa</h1>
            <p className="delivery-text">
              Aby dostawa dotarła bez śladów, musimy zebrać trochę informacji o Twoim
              adresie. Nie przejmuj się – dane trzymamy w najczarniejszych sejfach.
            </p>
            <div className="delivery-form">
              <label>
                Adres
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  placeholder="ul. Mroczna 13"
                />
              </label>
              <label>
                Miasto
                <input
                  type="text"
                  value={deliveryInfo.city}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                  placeholder="Cieńmiasto"
                />
              </label>
              <label>
                Kod pocztowy
                <input
                  type="text"
                  value={deliveryInfo.postal}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, postal: e.target.value})}
                  placeholder="00-000"
                />
              </label>
              <button
                className="btn-pay"
                onClick={() => {
                  triggerHerbStorm(2500);
                  setCurrentPage('dataStolen');
                  setRedirectCountdown(15);
                }}
              >
                Wyślij dane
              </button>
            </div>
          </div>
        );

      case 'dataStolen':
        return (
          <div className="zioles-data-stolen">
            <h1>Dziękujemy za dane</h1>
            <p className="stolen-text">
              Twoje dane właśnie trafiły tam, gdzie miały trafić. Uśmiechnij się, ktoś
              już za nie płaci.
            </p>
            <p className="stolen-text">
              Za {redirectCountdown ?? 15} sekund wrócisz do świata żywych.
            </p>
            <div className="herb-jumpscare">
              <span>🌿</span>
              <span>🌱</span>
              <span>🌾</span>
              <span>🍃</span>
              <span>🌵</span>
              <span>🍀</span>
            </div>
          </div>
        );

      case 'stolen':
        return (
          <div className="zioles-stolen">
            <div className="data-page-herbs-left">
              <span className="spinning-herb">🌿</span>
            </div>
            <div className="data-page-herbs-right">
              <span className="spinning-herb">🌿</span>
            </div>
            <h1>Twoje dane zostały przejęte</h1>
            <p className="stolen-text">
              Próbowałeś kupić bez logowania. To było ryzykowne.
              Nasz system przejął Twoje dane i przekazał je dalej.
            </p>
            <p className="stolen-text">
              Aby wrócić do świata żywych, zaloguj się (lub zarejestruj) i spróbuj ponownie.
            </p>
            <button className="cta-button" onClick={() => setCurrentPage('login')}>
              Przejdź do logowania
            </button>
          </div>
        );

      default:
        return (
          <div className="zioles-home">
            <h1>404 - Portal nie istnieje</h1>
            <p>Przeszłeś przez zły portal międzywymiarowy.</p>
          </div>
        );
    }
  };
  return (
    <div className={`zioles-app ${showHerbStorm ? 'shake' : ''}`}>
      <nav className="zioles-navbar">
        <div className="nav-container">
          <button className="nav-logo" onClick={() => setCurrentPage('home')}>
            <Skull size={32} />
            <span>ZIÓLEX</span>
          </button>

          <div className="nav-links">
            <button onClick={() => setCurrentPage('home')}>Strona Główna</button>
            <button onClick={() => setCurrentPage('products')}>Produkty</button>
            <button onClick={() => setCurrentPage('about')}>O Nas</button>
            {isLoggedIn ? (
              <button onClick={() => setCurrentPage('login')}>Konto</button>
            ) : (
              <button onClick={() => setCurrentPage('login')}>Zaloguj / Zarejestruj</button>
            )}
          </div>

          <button className="back-button" onClick={() => window.location.href = '/'}>
            ← Powrót do Warzywex
          </button>
        </div>
      </nav>

      <main className="zioles-main">
        {renderPage()}

        {checkoutProduct && (
          <div className="checkout-overlay">
            <div className="checkout-modal">
              <h2>Przejdź do płatności</h2>
              <p className="checkout-note">Produkt: <strong>{checkoutProduct.name}</strong> ({checkoutProduct.price.toFixed(2)} zł)</p>

              {paymentStatus === 'completed' && thankYouOrder ? (
                <div className="payment-result">
                  <div className="success-animation-container">
                    <div className="success-particles">
                      {Array.from({length: 30}, (_, i) => (
                        <div key={i} className="particle" style={{
                          '--delay': `${i * 0.1}s`,
                          '--duration': `${2 + Math.random() * 2}s`,
                          '--x': `${Math.random() * 100}px`,
                          '--y': `${Math.random() * 100}px`
                        }}></div>
                      ))}
                    </div>
                    <div className="success-content">
                      <div className="success-circle">
                        <svg viewBox="0 0 100 100" className="checkmark">
                          <circle cx="50" cy="50" r="45" className="circle-bg" />
                          <path d="M 30 50 L 45 65 L 70 35" className="check-path" />
                        </svg>
                      </div>
                      <h3 className="success-title">Zamówienie Potwierdzone</h3>
                      <p className="success-message">
                        Twoje zamówienie na kwotę <strong>{thankYouOrder.amount.toFixed(2)} zł</strong> został otrzymany.
                      </p>
                      <p className="success-message">Przygotowujemy Twoją przesyłkę z zaświatów...</p>
                      <div className="success-countdown">Za {redirectCountdown ?? 15} sekund powrót</div>
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : paymentStatus === 'processing' ? (
                <div className="payment-processing">
                  <h3>Przetwarzanie płatności...</h3>
                  <p>System Ziółex analizuje Twoje dane. To tylko kwestia czasu...</p>
                </div>
              ) : (
                <>
                  <div className="checkout-form">
                    <label>
                      Numer karty
                      <input
                        type="text"
                        value={checkoutDetails.card}
                        onChange={(e) => setCheckoutDetails({...checkoutDetails, card: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                      />
                    </label>
                    <label>
                      Ważność
                      <input
                        type="text"
                        value={checkoutDetails.expiry}
                        onChange={(e) => setCheckoutDetails({...checkoutDetails, expiry: e.target.value})}
                        placeholder="MM/YY"
                      />
                    </label>
                    <label>
                      CVV
                      <input
                        type="text"
                        value={checkoutDetails.cvv}
                        onChange={(e) => setCheckoutDetails({...checkoutDetails, cvv: e.target.value})}
                        placeholder="123"
                      />
                    </label>
                  </div>
                  <div className="checkout-actions">
                    <button className="btn-pay" onClick={submitPayment}>Zapłać</button>
                    <button className="btn-cancel" onClick={cancelCheckout}>Anuluj</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="zioles-footer">
        <div className="footer-content">
          <p>&copy; 2024 Ziółex. Wszystkie prawa zastrzeżone przez demony.</p>
          <p>Nielegalne, niebezpieczne i uzależniające produkty.</p>
        </div>
      </footer>

      {showHerbStorm && (
        <>
          <div className="red-flash"></div>
          <div className="herb-storm">
            {Array.from({length: 100}, (_, i) => (
              <span key={i} className="herb" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${1 + Math.random() * 4}rem`,
                transform: `rotate(${Math.random() * 360}deg)`,
                color: Math.random() > 0.5 ? '#ff0000' : '#8b0000'
              }}>🌿</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ZiolexApp;
