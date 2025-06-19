import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import Cart from '../Cart/Cart';
import './Header.scss';

interface HeaderProps {
  cartCount: number;
  user: {
    name: string;
    email: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ user, cartCount }) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container-header">
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => handleNav('/')}>
          <img src={logo} alt="Logo" />
        </div>
        <ul className="navbar-nav">
          <li onClick={() => handleNav('/')}>Home</li>
          <li onClick={() => handleNav('/menu')}>Menu</li>
          <li>Company</li>
          <li onClick={() => handleNav('/login')}>
            {user ? 'Logout' : 'Login'}
          </li>
          <li>
            <Cart user={user} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
