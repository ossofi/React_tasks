import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import type { CustomUser } from './types/types';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from './store/cartSlice';
import { RootState } from './store/store';
import AppRouter from './router/Router';

const App: React.FC = () => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const dispatch = useDispatch();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

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
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <div className="app-container">
          <Header cartCount={user ? cartCount : 0} user={user} />
          <AppRouter user={user} />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
