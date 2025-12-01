import React, { useState } from 'react';
import ProductCard from '../components/products/ProductCard.jsx';

import { productsData } from '../components/products/ProductList.jsx';

const ProduktyPage = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredProducts = filter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === filter);

  return (
    <div className="page produkty-page">
      <h1>Nasze Produkty</h1>
      
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProduktyPage;
