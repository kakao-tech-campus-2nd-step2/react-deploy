import { fetchInstance } from '../instance';

export const register = async (email: string, password: string): Promise<void> => {
  await fetchInstance.post('/api/members/register', {
    email: email,
    password: password,
  });
};
