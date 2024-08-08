import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authTokenStorage } from '@/utils/storage';

type AuthInfo = {
  id: number;
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authTokenStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthToken) {
      const id = parseInt(currentAuthToken.slice(0, 5), 10); // 토큰 앞의 5자리 추출
      setAuthInfo({
        id, // 추출한 ID 설정
        name: 'User', //사용자 이름을 임의로 설정
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthToken]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
