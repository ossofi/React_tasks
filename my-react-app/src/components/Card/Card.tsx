import React, { useState, useRef } from 'react';
import './Card.scss';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  CartItem,
  Product
} from '../../store/cartSlice';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { CustomUser } from '../../pages/Home';

type CardMode = 'menu' | 'order';

interface CardProps {
  product: Product | CartItem;
  mode: CardMode;
  user?: CustomUser | null;
}

const Card: React.FC<CardProps> = ({ product, mode, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [quantity, setQuantity] = useState<number>(
    'quantity' in product ? product.quantity : 1
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);

    if (mode === 'order') {
      dispatch(updateQuantity({ id: product.id, quantity: value }));
    }
  };

  const handleSelectOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    requestAnimationFrame(() => {
      e.target.select();
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className={`item-card ${mode === 'order' ? 'order-mode' : ''}`}>
      {mode === 'order' ? (
        <div className="order-card-content">
          <div className="order-left">
            <img src={product.img} alt={product.meal} className="item-img" />
            <h2 className="product-title">{product.meal}</h2>
          </div>
          <div className="order-right">
            <span className="card-price">${product.price}</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              ref={inputRef}
              value={quantity}
              onFocus={handleSelectOnFocus}
              onChange={handleQuantityChange}
            />
            <Button className="remove-from-cart" onClick={handleRemove}>
              X
            </Button>
          </div>
        </div>
      ) : (
        <>
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
                  inputMode="numeric"
                  min={1}
                  ref={inputRef}
                  value={quantity}
                  onFocus={handleSelectOnFocus}
                  onChange={handleQuantityChange}
                />
              </div>
              <Button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
