import React from 'react';
import logo from '../../assets/images/Logo.png';
import Cart from '../Cart/Cart';
import './Header.scss';

interface HeaderProps {
  cartCount: number;
  user: {
    name: string;
    email: string;
  } | null;
  onNavigate: (page: 'home' | 'menu' | 'login') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate }) => {
  return (
    <div className="container-header">
      <nav className="navbar">
        <a className="navbar-logo" href="#" onClick={() => onNavigate('home')}>
          <img src={logo} alt="Logo" />
        </a>
        <ul className="navbar-nav">
          <li onClick={() => onNavigate('home')}>Home</li>
          <li onClick={() => onNavigate('menu')}>Menu</li>
          <li>Company</li>
          <li onClick={() => onNavigate('login')}>
            {user ? 'Logout' : 'Login'}
          </li>
          <li>
            <Cart />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
