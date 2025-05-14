import React, { useState } from 'react';
import MenuPage from './pages/Menu';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  const [cartCount, _setCartCount] = useState(0);

  // const handleAddToCart = (quantity) => {
  //   setCartCount(prev => prev + quantity);
  // };

  return (
    <div className="app">
      <div className="app-container">
        <Header cartCount={cartCount} />
        <Home />
        {/* <MenuPage onAddToCart={handleAddToCart} cartCount={cartCount} /> */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
