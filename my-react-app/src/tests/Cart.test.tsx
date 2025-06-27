import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart/Cart';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import { addToCart } from '../store/cartSlice';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Cart Component', () => {
  beforeEach(() => {
    store.dispatch({ type: 'cart/resetCart' });
    mockNavigate.mockReset();
  });

  it('renders cart icon and correct count', () => {
    store.dispatch(
      addToCart({
        id: '1',
        meal: 'Pizza',
        price: 10,
        quantity: 2,
        img: '/pizza.jpg',
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart user={{ name: 'Test', email: 'test@example.com' }} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByAltText(/Cart/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated user to login', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart user={null} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('img', { name: /Cart/i }));
    expect(alertSpy).toHaveBeenCalledWith('You should log in to access cart');
  });
});
