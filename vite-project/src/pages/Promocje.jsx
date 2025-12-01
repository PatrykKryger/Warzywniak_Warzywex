import React from 'react';
import ProductCard from '../components/products/ProductCard.jsx';
import { productsData } from '../components/products/ProductList.jsx';


const PromocjePage = () => {
  const promoProducts = productsData.filter(p => p.promo === true);

  return (
    <div className="page">
      <div className="promo-header">
        <h1>Aktualne Promocje</h1>
        <p>Skorzystaj z wyjątkowych okazji na świeże produkty</p>
      </div>

      <div className="products-grid">
        {promoProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PromocjePage;