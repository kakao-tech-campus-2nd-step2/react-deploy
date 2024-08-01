import { fetchInstance } from '../instance';

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetchInstance.post<LoginResponse>('/api/members/login', {
    email: email,
    password: password,
  });
  return response.data;
};
