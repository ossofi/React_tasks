import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import OrderPage from '../pages/Order';
import cartReducer from '../store/cartSlice';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { CartItem } from '../types/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const setupStore = (initialCartItems: CartItem[] = []) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: { items: initialCartItems },
    },
  });

describe('OrderPage', () => {
  let alertSpy: any;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    mockNavigate.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows alert if form is submitted with empty cart', () => {
    const store = setupStore([]);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Order/i }));
    expect(alertSpy).toHaveBeenCalledWith('The cart is empty');
  });

  it('shows alert if address details are missing', () => {
    const store = setupStore([
      { id: '1', meal: 'Test product', price: 10, quantity: 1, img: 'test-image-url' },
    ]);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Order/i }));
    expect(alertSpy).toHaveBeenCalledWith('Please fill in all delivery details');
  });

  it('resets cart and redirects after successful order', () => {
    const initialItems = [
      { id: '1', meal: 'Test product', price: 10, quantity: 1, img: 'test-image-url' },
    ];
    const store = setupStore(initialItems);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </Provider>
    );

    const streetInput = screen.getByText(/Street/i).nextElementSibling as HTMLInputElement;
    fireEvent.change(streetInput, { target: { value: 'Main St' } });

    const houseInput = screen.getByText(/House/i).nextElementSibling as HTMLInputElement;
    fireEvent.change(houseInput, { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /Order/i }));

    expect(alertSpy).toHaveBeenCalledWith('Order placed! Details will be sent to your email');

    const state = store.getState();
    expect(state.cart.items.length).toBe(0);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
