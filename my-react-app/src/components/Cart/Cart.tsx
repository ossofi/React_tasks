import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import basket from '../../assets/images/Basket.png';
import './Cart.scss';
import type { CartProps } from '../../types/types';

const Cart: React.FC<CartProps> = ({ user }) => {
  const navigate = useNavigate();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleCartClick = () => {
    if (!user) {
      alert('You should log in to access cart');
      navigate('/login');
    } else {
      navigate('/order');
    }
  };

  return (
    <div className="cart-container" onClick={handleCartClick}>
      <img src={basket} alt="Cart" className="cart-icon" />
      <span className="cart-counter">{cartCount}</span>
    </div>
  );
};

export default Cart;
