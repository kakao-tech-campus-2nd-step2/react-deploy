import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button'; // 공통 Button 사용
import { Spacing } from '@/components/common/layouts/Spacing';
import { BASE_URL, fetchInstance } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';
import { RouterPath } from '@/routes/path';

export const NoneKakaoRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  interface RegisterDatas {
    email: string;
    password: string;
  }

  const handleRegister = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('이메일을 올바르게 입력해주세요');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    try {
      const data: RegisterDatas = { email, password };
      console.log(data);
      const response = await fetchInstance.post(`${BASE_URL}/api/members/register`, {
        email,
        password,
      });
      const token = response.data.token;
      console.log(response.data);
      if (token) {
        authSessionStorage.set({ token });
        console.log('Token saved to authSessionStorage:', token);
      }
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate(RouterPath.noneKakaoLogin);
      window.location.reload();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Title>회원가입</Title>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacing height={16} />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={32} />
        <Button onClick={handleRegister}>회원가입</Button>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f9f9f9;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;

  @media screen and (min-width: 640px) {
    padding: 60px 52px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

export default NoneKakaoRegisterPage;
