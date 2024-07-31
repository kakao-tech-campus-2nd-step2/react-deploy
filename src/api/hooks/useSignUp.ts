import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export interface SignInfoType {
  email: string;
  password: string;
}

const SignUpPath = `${BASE_URL}/api/members/register`;

const SignUp = async (SignInfo: SignInfoType) => {
  const response = await fetchInstance.post(SignUpPath, SignInfo);
  return response.data;
};

export const userSignUp = () =>
  useMutation({
    mutationFn: (SignInfo: SignInfoType) => SignUp(SignInfo),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      window.location.replace(`${window.location.origin}/`);
    },
    onError: error => {
      alert('회원가입에 실패했습니다.');
      console.error(error);
    },
  });
