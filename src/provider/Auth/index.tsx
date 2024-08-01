import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthInfo = {
  email: string;
  password: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('/api/members/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setAuthInfo({
              email: data.email,
              password: data.password,
              token,
            });
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to fetch user info', error);
          localStorage.removeItem('token');
        }
      };

      fetchUserInfo();
    }

    setIsReady(true);
  }, []);

  if (!isReady) return <></>;

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
