import React from 'react';
import ProductCard from './ProductCard.jsx';

const productsData = [
  { id: 1, name: 'Pomidory malinowe', price: 12.99, category: 'warzywa', image: '🍅', promo: false },
  { id: 2, name: 'Ogórki gruntowe', price: 8.50, category: 'warzywa', image: '🥒', promo: true, oldPrice: 11.99 },
  { id: 3, name: 'Jabłka ligol', price: 6.99, category: 'owoce', image: '🍎', promo: false },
  { id: 4, name: 'Marchew ekologiczna', price: 5.50, category: 'warzywa', image: '🥕', promo: false },
  { id: 5, name: 'Sałata lodowa', price: 4.99, category: 'warzywa', image: '🥬', promo: true, oldPrice: 7.50 },
  { id: 6, name: 'Papryka czerwona', price: 15.99, category: 'warzywa', image: '🫑', promo: false },
  { id: 7, name: 'Gruszki Conference', price: 9.99, category: 'owoce', image: '🍐', promo: false },
  { id: 8, name: 'Buraki czerwone', price: 4.50, category: 'warzywa', image: '🫚', promo: true, oldPrice: 6.00 },
  { id: 9, name: 'Sok jabłkowy 1L', price: 12.00, category: 'przetwory', image: '🧃', promo: false },
  { id: 10, name: 'Ogórki kiszone słoik', price: 18.50, category: 'przetwory', image: '🥒', promo: false },
  { id: 11, name: 'Dżem truskawkowy', price: 15.00, category: 'przetwory', image: '🍓', promo: true, oldPrice: 19.00 },
  { id: 12, name: 'Miód lipowy 500g', price: 35.00, category: 'przetwory', image: '🍯', promo: false },
];

export { productsData };