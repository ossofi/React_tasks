import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { resetCart } from '../store/cartSlice'; // import from slice file
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import type { CartItem } from '../types/types';

const OrderPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('The cart is empty');
      return;
    }

    if (!street.trim() || !house.trim()) {
      alert('Please fill in all delivery details');
      return;
    }

    alert('Order placed! Details will be sent to your email');
    dispatch(resetCart());
    navigate('/');
  };

  return (
    <div className="order-container">
      <h1 className="order-title">Finish your order</h1>

      <div className="order-items">
        {cartItems.map((item: CartItem) => (
          <Card key={item.id} product={item} mode="order" />
        ))}
      </div>

      <form className="order-form-container" onSubmit={handleSubmit}>
        <div className="order-form">
          <p>
            <span>Street</span>
            <input
              type="text"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </p>
          <p>
            <span>House</span>
            <input
              type="text"
              value={house}
              onChange={e => setHouse(e.target.value)}
            />
          </p>
          <div className="order-button-container">
            <Button type="submit" className="button--submit">
              Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
