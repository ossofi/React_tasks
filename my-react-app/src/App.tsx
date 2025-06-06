import React, { useState, useEffect } from 'react';
import MenuPage from './pages/Menu';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginPage from './pages/Login';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase.js';
import { CustomUser } from './pages/Home';
import { useDispatch } from 'react-redux';
import { resetCart } from './store/cartSlice';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [page, setPage] = useState<'home' | 'menu' | 'login'>('home');

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || 'Anonymous',
          email: currentUser.email || 'No Email',
        });
      } else {
        setUser(null);
        dispatch(resetCart());
      }
    });
    return () => unsub();
  }, []);
  
  return (
    <div className="app">
      <div className="app-container">
        <Header
          cartCount={user ? cartCount : 0}
          user={user}
          onNavigate={setPage}/>

        {page === 'login' && (
          <LoginPage onBackHome={() => setPage('home')} />
        )}

        {page === 'home' && <Home user={user} onNavigate={setPage} />}

        {page === 'menu' && <MenuPage user={user} onNavigate={setPage} />}

        <Footer />
      </div>
    </div>
  );
};

export default App;
