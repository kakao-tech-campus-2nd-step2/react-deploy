import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { authSessionStorage } from '@/utils/storage';

export type AuthInfo = {
  email: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  return <AuthContext.Provider value={currentAuthToken}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
