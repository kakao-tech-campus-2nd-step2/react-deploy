import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  id: string;
  name: string;
  token: string;
};

type AuthContextValue = {
  authInfo: AuthInfo | undefined;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthToken) {
      setAuthInfo({
        id: currentAuthToken, // TODO: 임시로 로그인 페이지에서 입력한 이름을 ID, token, name으로 사용
        name: currentAuthToken,
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthToken]);

  const logout = () => {
    authSessionStorage.clear(); 
    setAuthInfo(undefined); 
  };

  if (!isReady) return <></>;
  return (
    <AuthContext.Provider value={{ authInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
