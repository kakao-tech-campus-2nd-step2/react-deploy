import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/api/instance';
import { fetchInstance } from '@/api/instance';
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
      const data: RegisterDatas = {email, password};
      console.log(data);
      const response = await fetchInstance.post(`${BASE_URL}/api/members/register`,{
        email,
        password
      }   
        );
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
    <div>
      <h2>회원가입</h2>
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
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
};
