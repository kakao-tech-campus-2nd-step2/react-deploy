import {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { tokenStorage } from '@utils/storage';

interface LoginStatus {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const defaultLoginStatus: LoginStatus = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const LoginContext = createContext<LoginStatus>(defaultLoginStatus);

function LoginContextProvider({ children }: { children: ReactNode }) {
  const storedToken = tokenStorage.get();

  const [isLoggedIn, setIsLoggedIn] = useState(typeof storedToken === 'string');

  useEffect(() => {
    if (!isLoggedIn) tokenStorage.set();
  }, [isLoggedIn]);

  // 사실 안 감싸도 똑같은데 eslint 에러가 나서 감쌌다
  const loginStatus: LoginStatus = useMemo<LoginStatus>(() => ({
    isLoggedIn, setIsLoggedIn,
  }), [isLoggedIn]);

  return (
    <LoginContext.Provider value={loginStatus}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
