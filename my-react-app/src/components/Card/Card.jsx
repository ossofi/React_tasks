import React, { useState } from 'react';
import Button from '../Button/Button.jsx';
import './Card.scss';

const MenuCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    onAddToCart(quantity); 
  };

  return (
    <div className="item-card">
      <div className="item-card-left">
        <img src={product.img} alt={product.meal} className="item-img" />
      </div>
      <div className="item-card-right">
        <div className="item-info">
          <h2 className="product-title">{product.meal}</h2>
          <span className="card-price">${product.price}</span>
        </div>
        <p className="item-description">
          {product.instructions ? product.instructions.slice(0, 100) + '...' : ''}
        </p>
        <div className="item-footer">
          <div className="item-amount">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <Button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
