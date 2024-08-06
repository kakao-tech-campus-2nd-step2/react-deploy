import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { useBackend } from '@/provider/Auth/Backend';

import { fetchInstance } from '../instance';

export type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type RegisterResponse = {
  id: number;
  email: string;
  name: string;
  token: string;
};

const registerPath = '/api/members/register';
const loginPath = '/api/members/login';

const register = async (data: RegisterData, baseURL: string): Promise<RegisterResponse> => {
  const response: AxiosResponse<RegisterResponse> = await fetchInstance(baseURL).post(
    registerPath,
    data,
  );
  return response.data;
};

const login = async (data: LoginData, baseURL: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await fetchInstance(baseURL).post(loginPath, data);
  return response.data;
};

export const useRegister = (): UseMutationResult<RegisterResponse, Error, RegisterData> => {
  const { backendUrl } = useBackend();
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: (data: RegisterData) => register(data, backendUrl),
  });
};

export const useLogin = (): UseMutationResult<AuthResponse, Error, LoginData> => {
  const { backendUrl } = useBackend();
  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => login(data, backendUrl),
  });
};
