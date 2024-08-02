import { BASE_URL, fetchInstance } from './instance';

export const register = async (email: string, password: string) => {
  const response = await fetchInstance.post(`${BASE_URL}/api/members/register`, {
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await fetchInstance.post(`${BASE_URL}/api/members/login`, {
    email,
    password,
  });
  return response.data;
};
