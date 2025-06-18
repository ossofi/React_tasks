import React, { useState, useEffect } from 'react';
import MenuPage from './pages/Menu';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/Login';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase.js';
import { CustomUser } from './pages/Login';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [user, setUser] = useState<CustomUser | null>(null);
  const [page, setPage] = useState<'home' | 'menu' | 'login'>('home');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email || 'No Email',
        });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);


  const handleAddToCart = (quantity: number) => {
    if (!user) {
      setPage('login');
      return;
    }
    setCartCount(c => c + quantity);
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
export type { CustomUser };