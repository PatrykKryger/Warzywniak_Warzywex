import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const cities = [
    { id: 'santiago', name: 'Santiago', lat: -33.4489, lng: -70.6693 },
    { id: 'valparaiso', name: 'Valparaíso', lat: -33.0472, lng: -71.6127 },
    { id: 'concepcion', name: 'Concepción', lat: -36.8269, lng: -73.0498 },
    { id: 'serena', name: 'La Serena', lat: -29.9045, lng: -71.2489 },
    { id: 'antofagasta', name: 'Antofagasta', lat: -23.65, lng: -70.4 },
    { id: 'iquique', name: 'Iquique', lat: -20.2307, lng: -70.135 },
    { id: 'puertomontt', name: 'Puerto Montt', lat: -41.4693, lng: -72.9423 },
    { id: 'puntaarenas', name: 'Punta Arenas', lat: -53.1638, lng: -70.9171 },
];

function pickTwoRandom(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 2);
}

export function Mapa() {
    const libraries = useMemo(() => ['places'], []);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) console.warn('Brak VITE_GOOGLE_MAPS_API_KEY w .env');

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    const selectedCities = useMemo(() => pickTwoRandom(cities), []);
    const [openId, setOpenId] = useState(null);

    if (loadError) return <div>Nie udało się załadować mapy</div>;
    if (!isLoaded) return <div>Ładowanie mapy...</div>;

    const center = { lat: -33.0, lng: -71.0 };
    const containerStyle = { width: '100%', height: '400px' };

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
            {selectedCities.map((c) => (
                <Marker
                    key={c.id}
                    position={{ lat: c.lat, lng: c.lng }}
                    onClick={() => setOpenId(c.id)}
                    title={`Warzywex - ${c.name}`}
                />
            ))}

            {selectedCities.map((c) =>
                openId === c.id ? (
                    <InfoWindow
                        key={`info-${c.id}`}
                        position={{ lat: c.lat, lng: c.lng }}
                        onCloseClick={() => setOpenId(null)}
                    >
                        <div
                            style={{
                                minWidth: 150,
                                padding: '12px 14px',
                                borderRadius: '12px',
                                background: '#ffffff',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                                fontFamily: 'Arial, sans-serif',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginBottom: 6,
                                }}
                            >
                                🥕 Warzywex
                            </div>

                            <div
                                style={{
                                    fontSize: '14px',
                                    marginBottom: 4,
                                    color: '#444',
                                }}
                            >
                                {c.name}
                            </div>

                            <div style={{ fontSize: '13px', color: '#777' }}>
                                Sklep lokalny — świeże warzywa i owoce 🍅
                            </div>
                        </div>
                    </InfoWindow>
                ) : null
            )}
        </GoogleMap>
    );
}

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


        <div className="map-section" style={{ marginTop: 20 }}>
            <h2>Gdzie nas znaleźć</h2>
            <Mapa />
        </div>
    </div>
);

export default ONasPage;
