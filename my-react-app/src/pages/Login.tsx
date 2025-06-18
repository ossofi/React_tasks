import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/userSlice';

const LoginPage: React.FC<{ onBackHome: () => void }> = ({ onBackHome }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ name: firebaseUser.displayName || '', email: firebaseUser.email || '' }));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim()) {
      setError('All fields are required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Email format is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch {
      setError('Login failed. Check credentials.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail('');
    setPassword('');
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-container">
      <h1>{user ? `Logged in as ${user.email}` : 'Log In'}</h1>

      {user ? (
        <>
          <Button onClick={handleLogout} className="button--more">Logout</Button>
          <Button onClick={onBackHome} className="button--menu">Go Home</Button>
        </>
      ) : (
        <form onSubmit={handleLogin} className="login-form-container">
          <div className="login-form">
            <p>
              <span>User</span>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </p>
            <p>
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </p>
          </div>

          <div className="button-container">
            <Button type="submit" className="button--submit">Submit</Button>
            <Button type="button" onClick={handleCancel} className="button--cancel">Cancel</Button>
          </div>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
