import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button'; // 공통 Button 사용
import { Spacing } from '@/components/common/layouts/Spacing';
import { BASE_URL, fetchInstance } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';

export const NoneKakaoLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('이메일을 올바르게 입력해주세요');
      return;
    }

    try {
      const response = await fetchInstance.post(`/api/members/login`, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        authSessionStorage.set({ token });
      }
      navigate('/');
      window.location.reload();
    } catch (error) {
      alert('올바르지 않은 이메일 또는 비밀번호입니다.');
      console.error('Login failed:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Wrapper onKeyDown={handleKeyDown}>
      <FormWrapper>
        <Title>비회원 로그인</Title>
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
        <Button onClick={handleLogin}>로그인</Button>
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

export default NoneKakaoLoginPage;
