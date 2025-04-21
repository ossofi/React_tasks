import logo from '../assets/images/Logo.png';
import basket from '../assets/images/Basket.png';

const Header = () => {
  return (
    <div className='container-header'>
        <nav className='navbar'>
        <a className='navbar-logo' href='#'>
            <img src={logo} />
         </a>
         <ul className='navbar-nav'>
            <li>Home</li>
            <li>Menu</li>
            <li>Company</li>
            <li>Login</li>
            <a className='navbar-logo' href='#'>
            <img src={basket} />
         </a>
         </ul>
         
        </nav>
    </div>
  )
}

export default Header
