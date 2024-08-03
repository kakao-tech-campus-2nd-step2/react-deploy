import { Button,Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type AuthRequestBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  email: string;
  token: string;
};

type ErrorResponse = {
  errorMessage: string;
};

const isErrorResponse = (error: unknown): error is { response: { data: ErrorResponse } } => {
  return typeof error === 'object' && error !== null &&
    'response' in error &&
    typeof (error as { response?: unknown }).response === 'object' &&
    'data' in (error as { response: { data?: unknown } }).response &&
    typeof (error as { response: { data: { errorMessage?: unknown } } }).response.data.errorMessage === 'string';
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post<LoginResponse>('/api/members/login', {
        email,
        password,
      } as AuthRequestBody);
      console.log('로그인 성공:', response.data);
      localStorage.setItem('token', response.data.token);
      alert('로그인 성공');
      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      window.location.replace(redirectUrl);
    } catch (err: unknown) {
      if (isErrorResponse(err)) {
        console.error('로그인 실패:', err.response.data); // 서버 오류 확인을 위해 콘솔에 오류 메시지 출력
        alert('로그인 실패: ' + err.response.data.errorMessage);
      } else {
        console.error('로그인 실패:', err);
        alert('로그인 실패');
      }
    }
  };

  return (
    <div>
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={2}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={2}
      />
      <Button onClick={handleLogin} mb={2}>
        로그인
      </Button>
    </div>
  );
};

export default LoginForm;
