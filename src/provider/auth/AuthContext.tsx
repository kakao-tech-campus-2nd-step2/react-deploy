import { createContext } from 'react';

import { LoginResponse } from '@/api/services/auth/login';

export type AuthInfo = LoginResponse;

export type AuthContextType = {
  authInfo?: AuthInfo;
  updateAuthInfo: (authToken?: AuthInfo) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
