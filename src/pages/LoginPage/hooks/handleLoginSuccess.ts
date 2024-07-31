import { useNavigate } from 'react-router-dom';

import { AuthInfo } from '@/provider/auth/AuthContext';
import { useAuth } from '@/provider/auth/useAuth';
import { authLocalStorage } from '@/utils/storage';

export const useLoginSuccess = () => {
  const navigate = useNavigate();
  const { updateAuthInfo } = useAuth();

  const handleLoginSuccess = (authInfo: AuthInfo) => {
    authLocalStorage.set(authInfo);
    updateAuthInfo(authInfo);
    navigate(-1);
  };

  return { handleLoginSuccess };
};
