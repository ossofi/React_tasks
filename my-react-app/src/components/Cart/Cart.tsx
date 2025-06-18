import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import basket from '../../assets/images/Basket.png';
import './Cart.scss';

const Cart: React.FC = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  
  return (
    <div className="cart-container">
      <img src={basket} alt="Cart" className="cart-icon" />
      <span className="cart-counter">{cartCount}</span>
    </div>
  );
};

export default Cart;
