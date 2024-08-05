import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authEmailStorage, authTokenStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log('로그인 요청:', { email: id, password });

      const response = await fetch(`${BASE_URL}/api/members/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: id, password }),
      });

      console.log('로그인 요청2:', { email: id, password });
      console.log('로그인 응답 상태:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('로그인 오류 데이터:', errorData);
        throw new Error('로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.');
      }

      const data = await response.json();
      console.log('로그인 성공 응답 데이터:', data);

      authTokenStorage.set(data.token); // 로그인 성공 시 토큰 저장
      authEmailStorage.set(id); // 로그인 성공 시 이메일 저장

      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/myaccount`;
      return window.location.replace(redirectUrl);
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const response = await fetchInstance.get(`${BASE_URL}/api/oauth2/kakao`, {
        params: {
          code: 'testCode',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        authTokenStorage.set(data.token);
        authEmailStorage.set('kakaoUser');
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        return window.location.replace(redirectUrl);
      } else if (response.status === 400) {
        const data = response.data;
        console.error(data.message);
        alert('카카오 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('카카오 로그인 오류');
    }
  };

  const handleSignUp = () => {
    navigate('/sign-up'); // 회원가입 페이지로 이동
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField
          placeholder="이메일"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing height={{ initial: 40, sm: 60 }} />
        <Button onClick={handleLogin}>로그인</Button>
        <Spacing height={{ initial: 20, sm: 40 }} />
        <Button onClick={handleSignUp}>회원가입</Button>
        <Spacing height={{ initial: 20, sm: 40 }} />
        <Button onClick={handleKakaoLogin}>카카오톡으로 로그인</Button>
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
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
