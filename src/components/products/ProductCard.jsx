import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

const ProductCard = ({ product, onDelete }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {product.promo && <div className="promo-badge">PROMOCJA</div>}
      {onDelete && (
        <button
          className="product-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Czy na pewno chcesz usunąć produkt \"${product.name}\"?`)) {
              onDelete(product.id);
            }
          }}
          title="Usuń produkt"
        >
          <Trash2 size={16} />
        </button>
      )}
      <div className="product-image">{product.image}</div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-price">
        {product.promo && <span className="old-price">{product.oldPrice.toFixed(2)} zł</span>}
        <span className="current-price">{product.price.toFixed(2)} zł</span>
      </div>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        <Plus size={18} />
        Dodaj do koszyka
      </button>
    </div>
  );
};

export default ProductCard;