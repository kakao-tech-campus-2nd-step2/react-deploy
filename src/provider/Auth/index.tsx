import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  token: string;
};

type AuthContextData = {
  authInfo: AuthInfo | undefined;
  setAuthInfo: (authInfo: AuthInfo) => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const handleAuthInfo = (currentAuthInfo: AuthInfo) => {
    setAuthInfo(currentAuthInfo);
    authSessionStorage.set(currentAuthInfo.token);
  };

  useEffect(() => {
    if (currentAuthToken) {
      setAuthInfo({ token: currentAuthToken });
    }
    setIsReady(true);
  }, [currentAuthToken]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo: handleAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
