import React from 'react';
import logo from '../../assets/images/Logo.png';
import Cart from '../Cart/Cart.jsx';
import './Header.scss';

const Header = ({ cartCount }) => {
  return (
    <div className="container-header">
      <nav className="navbar">
        <a className="navbar-logo" href="#">
          <img src={logo} alt="Logo" />
        </a>
        <ul className="navbar-nav">
          <li>Home</li>
          <li>Menu</li>
          <li>Company</li>
          <li>Login</li>
          <li>
            <Cart cartCount={cartCount} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
