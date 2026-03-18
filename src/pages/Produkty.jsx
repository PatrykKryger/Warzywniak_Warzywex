import React, { useEffect, useState } from 'react';
import ProductCard from '../components/products/ProductCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getStoredProducts, setStoredProducts } from '../utils/productStorage.js';

const ProduktyPage = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = () => setProducts(getStoredProducts());
    load();

    const handler = () => load();
    window.addEventListener('productsUpdated', handler);

    return () => window.removeEventListener('productsUpdated', handler);
  }, []);

  const handleDelete = (productId) => {
    const updated = products.filter(p => p.id !== productId);
    setStoredProducts(updated);
    setProducts(updated);
  };

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  const headerTitle = user?.role === 'employee' ? 'Lista najnowszych produktów Warzywex' : 'Nasze Produkty';

  return (
    <div className="page produkty-page">
      <div className="promo-header">
        <h1>{headerTitle}</h1>
        <p>Odkryj najświeższe warzywa, owoce i przetwory bezpośrednio z naszych gospodarstw</p>
      </div>
      
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          Wszystkie
        </button>
        <button 
          className={filter === 'warzywa' ? 'active' : ''} 
          onClick={() => setFilter('warzywa')}
        >
          Warzywa
        </button>
        <button 
          className={filter === 'owoce' ? 'active' : ''} 
          onClick={() => setFilter('owoce')}
        >
          Owoce
        </button>
        <button 
          className={filter === 'przetwory' ? 'active' : ''} 
          onClick={() => setFilter('przetwory')}
        >
          Przetwory
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={user?.role === 'employee' ? handleDelete : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ProduktyPage;
