import React, { useState } from 'react';
import './Card.scss';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem, Product } from '../../store/cartSlice';
import { AppDispatch } from '../../store/store';
import { CustomUser } from '../../pages/Home';

interface MenuCardProps {
  product: Product;
  user: CustomUser | null;
  onNavigate: (page: 'home' | 'menu' | 'login') => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ product, user, onNavigate }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    if (!user) {
      onNavigate('login');
      return;
    }
  
    const cartItem: CartItem = {
      ...product,
      quantity,
    };
    dispatch(addToCart(cartItem));
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
              min={1}
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
