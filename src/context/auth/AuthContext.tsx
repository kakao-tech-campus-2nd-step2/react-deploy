import { createContext } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, accessToken: string) => void;
  logout: () => void;
  userEmail: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
