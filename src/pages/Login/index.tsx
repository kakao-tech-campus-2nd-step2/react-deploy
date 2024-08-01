import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
import KAKAO_LOGIN from '@/assets/kakao_login_large_wide.png';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const exampleCode = 'exampleCode';

  const handleLogin = async () => {
    const registerUser = authSessionStorage.get();

    // 유저 데이터베이스가 있는 경우
    if (registerUser){
      // 로그인 시도 시, 등록된 사용자와 비교
      if (registerUser && email === registerUser.email && password === registerUser.password) {
        try {
          // 기존: fetch 사용 → 수정: 만들어진 instance 활용
          const response = await fetchInstance.post(`${BASE_URL}/api/members/login`, {
            email: email,
            password: password,
          });
          
          // 로그인 성공 (200) : 액세스 토큰을 생성하여 반환
          if (response.status === 200) {
            const data = await response.data;
            authSessionStorage.set({ email: email, token: data.token });
            const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
            return window.location.replace(redirectUrl);
          }
          
          // 로그인 실패 (400) : 메시지 반환
          else if (response.status === 400) {
            const data = await response.data;
            console.error(data.message);
            alert('로그인에 실패했습니다.');
          }
        } catch (error) {
          console.error(error);
          alert('로그인 중 오류가 발생했습니다.');
        }
      }
    } else {
      // 유저 데이터베이스가 없는 경우
      alert('알 수 없는 오류가 발생했습니다.');
    }
  }

  const handleKakaoLogin = async () => {
    try {
      const response = await fetchInstance.get(`${BASE_URL}/api/oauth2/kakao`, {
        params: {
          // 명세 확정되면 수정 필요!
          code: exampleCode
        }
      });
      
      // 카카오 로그인 성공 (200) : 액세스 토큰을 생성하여 반환
      if (response.status === 200) {
        const data = await response.data;
        authSessionStorage.set({ email: exampleCode, token: data.token });
        const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
        return window.location.replace(redirectUrl);
      }
    
      // 카카오 로그인 실패 (400) : 메시지 반환
      else if (response.status === 400) {
        const data = await response.data;
        console.error(data.message);
        alert('카카오 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  }

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button theme={'darkGray'} onClick={handleLogin}>로그인</Button>
        <Spacing height={20} />
        <Button theme={'darkGray'} onClick={() => navigate('/signup')}>회원 가입</Button>
        <Spacing height={20} />
        <KakaoLoginButton onClick={handleKakaoLogin}>
          <KakaoLogo src={KAKAO_LOGIN} alt="카카오로 로그인하기" />
        </KakaoLoginButton>
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

const KakaoLoginButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoLogo = styled.img`
  height: auto;
`;

