import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MenuPage from '../pages/Menu';
import LoginPage from '../pages/Login';
import OrderPage from '../pages/Order';
import PrivateRoute from './PrivateRouter';
import { CustomUser } from '../types/types';

interface AppRouterProps {
  user: CustomUser | null;
}

const AppRouter: React.FC<AppRouterProps> = ({ user }) => (
  <Routes>
    <Route path="/" element={<Home user={user} />} />
    <Route path="/menu" element={<MenuPage user={user} />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/order"
      element={
        <PrivateRoute user={user}>
          <OrderPage />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
