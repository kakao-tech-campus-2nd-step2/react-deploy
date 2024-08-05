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
  const [isReady, setIsReady] = useState(false); // 초기값을 false로 변경하여 준비 상태를 관리
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    const processToken = () => {
      if (!currentAuthToken) {
        setIsReady(true);
        return;
      }

      if (currentAuthToken === 'mock-token') {
        // Mock token 처리
        setAuthInfo({
          id: 'mock-id',
          name: 'Mock User',
          token: 'mock-token',
        });
        setIsReady(true);
        return;
      }

      try {
        // 실제 JWT 토큰 처리
        const base64Payload = currentAuthToken.split('.')[1];
        const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');

        const decodedJWT = JSON.parse(
          decodeURIComponent(
            window
              .atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join(''),
          ),
        );

        setAuthInfo({
          id: decodedJWT.email,
          name: decodedJWT.email,
          token: currentAuthToken,
        });
      } catch (error) {
        console.error('Error decoding JWT:', error);
        setAuthInfo(undefined);
      } finally {
        setIsReady(true);
      }
    };

    processToken();
  }, [currentAuthToken]);

  if (!isReady) return null; // 로딩 중일 때 아무것도 렌더링하지 않음

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
