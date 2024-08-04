import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentAuthToken = authSessionStorage.get();
    if (currentAuthToken) {
      setAuthInfo({
        name: "홍길동",
        token: currentAuthToken.token,
      });
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
