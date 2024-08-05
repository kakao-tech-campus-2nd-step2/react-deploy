import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/provider/auth/useAuth';
import { ROUTER_PATH } from '@/routes/path';

export const AdminRoute = () => {
  const { authInfo } = useAuth();

  const isAdmin = authInfo?.userInfo.role === 'ADMIN';

  return isAdmin ? <Outlet /> : <Navigate to={ROUTER_PATH.HOME} replace />;
};
