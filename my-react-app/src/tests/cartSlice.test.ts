import cartReducer, { addToCart, removeFromCart, resetCart, updateQuantity } from '../store/cartSlice';
import type { CartItem, CartState } from '../types/types';
import { describe, it, expect } from 'vitest';

describe('cartSlice', () => {
  const initialState: CartState = { items: [] };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle addToCart for a new item', () => {
    const newItem: CartItem = { id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' };
    const state = cartReducer(initialState, addToCart(newItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(newItem);
  });

  it('should increase quantity if adding an existing item', () => {
    const existingState: CartState = {
      items: [{ id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' }],
    };
    const addItem: CartItem = { id: '1', meal: 'Pizza', price: 12, quantity: 2, img: 'url' };
    const state = cartReducer(existingState, addToCart(addItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3);
  });

  it('should handle removeFromCart', () => {
    const existingState: CartState = {
      items: [
        { id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' },
        { id: '2', meal: 'Burger', price: 10, quantity: 1, img: 'url2' },
      ],
    };
    const state = cartReducer(existingState, removeFromCart('1'));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('2');
  });

  it('should handle resetCart', () => {
    const existingState: CartState = {
      items: [{ id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' }],
    };
    const state = cartReducer(existingState, resetCart());
    expect(state.items).toHaveLength(0);
  });

  it('should handle updateQuantity', () => {
    const existingState: CartState = {
      items: [{ id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' }],
    };
    const state = cartReducer(existingState, updateQuantity({ id: '1', quantity: 5 }));
    expect(state.items[0].quantity).toBe(5);
  });

  it('should not update quantity if item not found', () => {
    const existingState: CartState = {
      items: [{ id: '1', meal: 'Pizza', price: 12, quantity: 1, img: 'url' }],
    };
    const state = cartReducer(existingState, updateQuantity({ id: '2', quantity: 5 }));
    expect(state).toEqual(existingState);
  });
});
