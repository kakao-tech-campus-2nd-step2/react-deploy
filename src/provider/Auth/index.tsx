import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  email: string;
  name?: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    const currentAuthToken = authSessionStorage.get();
    if (currentAuthToken) {
      setAuthInfo({
        email: currentAuthToken.email || '',
        token: currentAuthToken.token,
      });
    }
    setIsReady(true);
  }, []);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
