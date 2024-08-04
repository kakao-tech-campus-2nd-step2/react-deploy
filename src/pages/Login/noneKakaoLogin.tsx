import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';
import { fetchInstance } from '@/api/instance';

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
      const response = await fetchInstance.post(`${BASE_URL}/api/members/login`, {
        email,
        password,
      });
      console.log(response.data);
      const { token } = response.data; // 로그인 응답에서 토큰 추출
      if (token) {
        authSessionStorage.set({ token });
        console.log('Token saved to authSessionStorage:', token);
      } // 토큰을 세션 스토리지에 저장
      // 로그인 성공 시 메인 페이지로 이동
      navigate('/');
      const storedAuthInfo = authSessionStorage.get();
      console.log('Stored auth info:', storedAuthInfo);
      window.location.reload();
      console.log(token);
    } catch (error) {
      alert('올바르지 않은 이메일 및 비밀번호입니다.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>비회원 로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};
