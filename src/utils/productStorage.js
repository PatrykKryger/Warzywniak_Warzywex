// Product storage utilities for managing product data in localStorage

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Pomidory', category: 'warzywa', price: 5.99, image: '🍅', description: 'Świeże pomidory, krwiste i soczyte', promo: false },
  { id: '2', name: 'Papryka czerwona', category: 'warzywa', price: 3.50, image: '🫑', description: 'Słodka papryka, idealna do sałatek', promo: true, oldPrice: 4.50, discount: '22%' },
  { id: '3', name: 'Cukinia', category: 'warzywa', price: 3.99, image: '🥒', description: 'Młoda, delikatna cukinia', promo: false },
  { id: '4', name: 'Brokół', category: 'warzywa', price: 5.49, image: '🥦', description: 'Bogaty w witaminy brokół', promo: true, oldPrice: 6.99, discount: '21%' },
  { id: '5', name: 'Morka', category: 'warzywa', price: 2.99, image: '🥕', description: 'Słodka marchewka, świeżo zebrana', promo: false },
  { id: '6', name: 'Salata lodowa', category: 'warzywa', price: 4.99, image: '🥬', description: 'Chrupiąca salata, idealna do sałatek', promo: false },
  { id: '7', name: 'Jabłka', category: 'owoce', price: 6.99, image: '🍎', description: 'Kruchutkie jabłka, słodkie i swakowite', promo: true, oldPrice: 7.99, discount: '12%' },
  { id: '8', name: 'Banany', category: 'owoce', price: 2.80, image: '🍌', description: 'Dojrzałe banany, idealne na śniadanie', promo: true, oldPrice: 3.50, discount: '20%' },
  { id: '9', name: 'Truskawki', category: 'owoce', price: 10.99, image: '🍓', description: 'Soczyste truskawki, małe opakowanie', promo: true, oldPrice: 12.99, discount: '15%' },
  { id: '10', name: 'Pomarańcze', category: 'owoce', price: 5.99, image: '🍊', description: 'Słodkie pomarańcze, bogate w witaminę C', promo: false },
  { id: '11', name: 'Winogrona zielone', category: 'owoce', price: 8.99, image: '🍇', description: 'Świeże winogrona, słodkie i soczyste', promo: false },
  { id: '12', name: 'Kiwi', category: 'owoce', price: 8.99, image: '🥝', description: 'Egzotyczne kiwi, bogate w witaminy', promo: true, oldPrice: 9.99, discount: '10%' },
  { id: '13', name: 'Marmolada malinowa', category: 'przetwory', price: 13.99, image: '🍓', description: 'Domowa marmolada z malin, bez konserwantów', promo: true, oldPrice: 15.99, discount: '12%' },
  { id: '14', name: 'Kompot jabłkowy', category: 'przetwory', price: 12.99, image: '🍎', description: 'Tradycyjny kompot z jabłek', promo: false },
  { id: '15', name: 'Sok pomarańczowy', category: 'przetwory', price: 9.99, image: '🧃', description: 'Świeży sok z pomarańczy, bez dodatków', promo: true, oldPrice: 11.99, discount: '17%' },
];

// Discount codes system
export const DISCOUNT_CODES = {
  'WELCOME10': { discount: 0.10, description: 'Witaj - 10% rabatu' },
  'SUMMER20': { discount: 0.20, description: 'Letnia promocja - 20% rabatu' },
  'VEGAN15': { discount: 0.15, description: 'Produkty wegańskie - 15% rabatu' },
  'SPRING25': { discount: 0.25, description: 'Wiosna - 25% rabatu na zamówienie powyżej 100 zł' },
  'OWOCE30': { discount: 0.30, description: 'Owoce - 30% rabatu' },
};

export const validateDiscountCode = (code) => {
  const upperCode = code.toUpperCase();
  if (DISCOUNT_CODES[upperCode]) {
    return DISCOUNT_CODES[upperCode];
  }
  return null;
};

export const getStoredProducts = () => {
  try {
    const stored = localStorage.getItem('products');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge stored products with default products to get updates
      const merged = DEFAULT_PRODUCTS.map(defaultProd => {
        const stored = parsed.find(p => p.id === defaultProd.id);
        return stored ? { ...defaultProd, ...stored } : defaultProd;
      });
      // Add any custom products that aren't in DEFAULT_PRODUCTS
      const customProducts = parsed.filter(p => !DEFAULT_PRODUCTS.find(dp => dp.id === p.id));
      return [...merged, ...customProducts];
    }
    // Initialize with default products if none exist
    localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  } catch (error) {
    console.error('Error reading stored products:', error);
    return DEFAULT_PRODUCTS;
  }
};

export const setStoredProducts = (products) => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Error storing products:', error);
  }
};

export const addStoredProduct = (product) => {
  const products = getStoredProducts();
  products.push({
    ...product,
    id: Date.now().toString(),
  });
  setStoredProducts(products);
  return products;
};

export const updateStoredProduct = (productId, updates) => {
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    setStoredProducts(products);
  }
  return products;
};

export const deleteStoredProduct = (productId) => {
  const products = getStoredProducts().filter(p => p.id !== productId);
  setStoredProducts(products);
  return products;
};
