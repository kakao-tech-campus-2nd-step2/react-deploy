import React, { useState } from 'react';

import { registerAndLogin } from '@/api/hooks/register'; // 경로 수정
import KAKAO_LOGO from '@/assets/kakao_logo.svg';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await registerAndLogin(email, password);
      alert('회원가입 및 자동 로그인 성공!');
      window.location.replace('/'); // 메인 페이지로 이동
    } catch (error) {
      alert('회원가입 실패: ' + (error as Error).message);
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
