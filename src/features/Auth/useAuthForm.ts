import { UserInfoData } from '@internalTypes/dataTypes';
import { useAuth } from '@context/auth/useAuth';
import { ROUTE_PATH } from '@routes/path';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberRegister } from '@apis/members/hooks/useMemberRegister';
import { useMemberLogin } from '@/apis/members/hooks/useMemerLogin';

export default function useAuthForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate: registerMutate } = useMemberRegister();
  const { mutate: loginMutate } = useMemberLogin();

  const [userInfo, setUserInfo] = useState<UserInfoData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSignUp = () => {
    registerMutate(userInfo, {
      onSuccess: (data) => {
        login(userInfo.email, data.access_token);
        navigate(ROUTE_PATH.HOME);
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    });
  };

  const handleLogin = () => {
    loginMutate(userInfo, {
      onSuccess: (data) => {
        login(userInfo.email, data.access_token);
        navigate(ROUTE_PATH.HOME);
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    });
  };

  const isUserInfoData = () => userInfo.email !== '' && userInfo.password !== '';

  const handleSubmit = (e: FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    if (isUserInfoData()) isSignUp ? handleSignUp() : handleLogin();
  };

  return {
    userInfo,
    handleChange,
    handleSubmit,
  };
}
