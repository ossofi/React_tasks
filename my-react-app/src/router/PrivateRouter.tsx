import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  user: { name: string; email: string } | null;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ user, children }) => {
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default PrivateRoute;
