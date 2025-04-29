import React, { useState } from 'react';
import MenuPage from './pages/Menu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header cartCount={cartCount} />
        <MenuPage onAddToCart={handleAddToCart} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
