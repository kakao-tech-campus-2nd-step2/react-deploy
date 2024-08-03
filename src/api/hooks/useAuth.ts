import { useMutation } from '@tanstack/react-query';
import { fetchInstance, BASE_URL } from '../instance';

interface AuthParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

const REGISTER_PATH = `${BASE_URL}/api/members/register`;
const LOGIN_PATH = `${BASE_URL}/api/members/login`;

const registerUser = (params: AuthParams): Promise<AuthResponse> => 
  fetchInstance.post<AuthResponse>(REGISTER_PATH, params).then(res => res.data);

const loginUser = (params: AuthParams): Promise<AuthResponse> => 
  fetchInstance.post<AuthResponse>(LOGIN_PATH, params).then(res => res.data);

export const useRegister = () => {
  return useMutation<AuthResponse, unknown, AuthParams>({
    mutationFn: registerUser
  });
};

export const useLogin = () => {
  return useMutation<AuthResponse, unknown, AuthParams>({
    mutationFn: loginUser
  });
};
