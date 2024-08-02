import type { AxiosError } from 'axios';
import React, { useState } from 'react';

<<<<<<< HEAD
import { register } from '@/api/hooks/register'; // register API 추가
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { authSessionStorage } from '@/utils/storage';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
=======
import { register } from '@/api/hooks/register'; // `register` 함수 가져오기
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { authSessionStorage } from '@/utils/storage';

const SignUpPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = async () => {
    if (!id || !password || !confirmPassword) {
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
<<<<<<< HEAD
      await register(email, password);
      alert('회원가입 성공!');
      authSessionStorage.set(email);
      window.location.replace('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패');
=======
      await register(id, password);
      alert('회원가입 성공!');
      authSessionStorage.set(id);
      window.location.replace('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      alert(`회원가입 실패: ${axiosError.response?.data?.message || axiosError.message}`);
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img src={KAKAO_LOGO} alt="카카오 CI" style={{ width: '88px' }} />
      <div
        style={{
          maxWidth: '580px',
          width: '100%',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          padding: '60px 52px',
        }}
      >
        <input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', marginBottom: '16px' }}
        />
        <button
          onClick={handleSignUp}
          style={{ width: '100%', padding: '8px 16px', backgroundColor: 'blue', color: 'white' }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
