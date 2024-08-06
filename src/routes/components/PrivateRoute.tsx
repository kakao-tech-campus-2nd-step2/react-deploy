import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';

export const PrivateRoute = () => {
  const authInfo = useAuth();

  if (!authInfo) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
