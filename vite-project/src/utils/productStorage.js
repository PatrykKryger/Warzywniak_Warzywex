import { productsData } from '../components/products/ProductList.jsx';

const STORAGE_KEY = 'products';

export const getStoredProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn('Nieprawidłowe dane produktów w localStorage:', err);
  }

  // Initialize with default list if none exists
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
  return productsData;
};

export const setStoredProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('productsUpdated'));
};
