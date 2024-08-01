import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  email: string;
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthEmail = sessionStorage.getItem('authEmail');
  const currentAuthToken = authSessionStorage.get();

  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthEmail && currentAuthToken) {
      const name = currentAuthEmail.split('@')[0];

      setAuthInfo({
        email: currentAuthEmail,
        name: name,
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthEmail, currentAuthToken]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
