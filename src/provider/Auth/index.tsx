import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage, emailSessionStorage } from '@/utils/storage';

type AuthInfo = {
  email: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const currentEmail = emailSessionStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthToken && currentEmail) {
      setAuthInfo({
        email: currentEmail,
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthToken, currentEmail]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
