import React, { ReactNode, useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '@hooks/useSessionStorage';
import { ROUTE_PATH } from '@routes/path';
import AuthContext from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useSessionStorage('authToken', '');
  const [userEmail, setUserEmail] = useSessionStorage('email', '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  useEffect(() => {
    setIsAuthenticated(!!authToken);
  }, [authToken]);

  const login = useCallback(
    (email: string, accessToken: string) => {
      setAuthToken(accessToken);
      setUserEmail(email);
    },
    [setAuthToken],
  );

  const logout = useCallback(() => {
    setAuthToken('');
    navigate(ROUTE_PATH.HOME);
  }, [setAuthToken, navigate]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      userEmail,
    }),
    [isAuthenticated, login, logout, userEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
