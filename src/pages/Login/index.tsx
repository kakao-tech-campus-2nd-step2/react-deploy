import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = queryParams.get('token');
    if (token) {
      console.log(queryParams);
      authSessionStorage.set({ token: token });
      const redirectUrl = queryParams.get('redirect') ?? `.`;
      return window.location.replace(redirectUrl);
    }
  }, [queryParams]);

  const handleConfirm = async () => {
    try {
      const response = await fetchInstance.post(`${BASE_URL}/api/members/login`, {
        email: email,
        password: password,
      });
      const data = await response.data;
      authSessionStorage.set({ token: data.token, email: email });
      const redirectUrl = queryParams.get('redirect') ?? '';
      navigate(getDynamicPath.login(redirectUrl));
    } catch (error) {
      console.error('Failed sign in', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };
  const handleKakaoLogin = async () => {
    const redirectUrl = encodeURIComponent(`${window.location.origin}/react-deploy/login`);
    window.location.href = `${BASE_URL}/api/members/kakao?redirect_url=${redirectUrl}`;
  };
  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <Button onClick={handleConfirm}>로그인</Button>
        <Spacing
          height={{
            initial: 20,
            sm: 20,
          }}
        />
        <Button onClick={handleKakaoLogin}>카카오계정 로그인</Button>
      </FormWrapper>
      <CustomButton onClick={() => navigate('/signUp')}>회원가입</CustomButton>
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
    padding: 60px 52px 40px;
  }
`;

const CustomButton = styled(Button)`
  max-width: 580px;
  background: none;
  :hover {
    background: none;
    text-decoration-line: underline;
  }
  :visited {
    outline: none;
    border: none;
  }
`;
