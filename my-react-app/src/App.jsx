import React, { useState, useEffect } from 'react';
import MenuPage from './pages/Menu';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleAddToCart = (q) => {
    if (!user) {
      setPage('login');
      return;
    }
    setCartCount((c) => c + q);
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header
          cartCount={user ? cartCount : 0}
          user={user}
          onNavigate={setPage}
        />

        {page === 'login' && (
          <LoginPage user={user} onBackHome={() => setPage('home')} />
        )}

        {page === 'home' && <Home />}

        {page === 'menu' && (
          <MenuPage onAddToCart={handleAddToCart} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;
