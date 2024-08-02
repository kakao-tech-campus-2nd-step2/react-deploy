import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { authLocalStorage } from '@/utils/storage';

import { UpDownDots } from '@/components/Loading/UpDownDots';

import { AuthContext, AuthInfo } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authLocalStorage.get();
  const [isReady, setIsReady] = useState(false);

  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  const updateAuthInfo = useCallback((authToken?: AuthInfo) => {
    if (!authToken) {
      setAuthInfo(undefined);
      return;
    }

    setAuthInfo({
      userInfo: {
        name: authToken.userInfo.name,
        role: authToken.userInfo.role,
      },
      accessToken: authToken.accessToken,
    });
  }, []);

  useEffect(() => {
    if (currentAuthToken && !authInfo) {
      updateAuthInfo(currentAuthToken);
    }
    setIsReady(true);
  }, [currentAuthToken, authInfo, updateAuthInfo]);

  const contextValue = useMemo(
    () => ({
      authInfo,
      updateAuthInfo,
    }),
    [authInfo, updateAuthInfo]
  );

  if (!isReady) return <UpDownDots />;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
