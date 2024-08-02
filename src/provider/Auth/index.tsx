import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  id: string;
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (
      currentAuthToken &&
      (currentAuthToken.id !== authInfo?.id || currentAuthToken.token !== authInfo?.token)
    ) {
      setAuthInfo({
        id: currentAuthToken.id,
        name: currentAuthToken.id,
        token: currentAuthToken.token,
      });
      setIsReady(true);
    }
  }, [currentAuthToken, authInfo]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
