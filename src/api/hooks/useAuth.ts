import { useMutation } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

interface AuthParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const useRegister = () => {
  return useMutation((params: AuthParams) =>
    fetchInstance.post<AuthResponse>('/api/members/register', params).then(res => res.data)
  );
};

export const useLogin = () => {
  return useMutation((params: AuthParams) =>
    fetchInstance.post<AuthResponse>('/api/members/login', params).then(res => res.data)
  );
};
