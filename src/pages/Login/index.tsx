import styled from '@emotion/styled';
<<<<<<< HEAD
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

<<<<<<< HEAD
import { login } from '@/api/hooks/auth'; // login API 추가
=======
import { login } from '@/api/hooks/login';
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
=======
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

>>>>>>> upstream/hehelee
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { authSessionStorage } from '@/utils/storage';

export const LoginPage = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState('');
=======
  const [id, setId] = useState('');
>>>>>>> upstream/hehelee
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleConfirm = async () => {
<<<<<<< HEAD
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
=======
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
      return;
    }

    try {
<<<<<<< HEAD
      await login(email, password);
      alert('로그인 성공!');
      authSessionStorage.set(email);
=======
      const { token } = await login(id, password);
      alert('로그인 성공!');
      authSessionStorage.set(token);
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258

      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      window.location.replace(redirectUrl);
    } catch (error) {
<<<<<<< HEAD
      console.error('로그인 실패:', error);
      alert('로그인 실패');
=======
      const axiosError = error as AxiosError<{ message: string }>;
      alert(`로그인 실패: ${axiosError.response?.data?.message || axiosError.message}`);
>>>>>>> 9fc38c008ccc8550a44151a08744a569411c2258
    }
=======
  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // TODO: API 연동

    // TODO: API 연동 전까지 임시 로그인 처리
    alert('로그인 성공!');
    authSessionStorage.set(id);

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    return window.location.replace(redirectUrl);
>>>>>>> upstream/hehelee
  };

  const handleSignUp = () => {
    navigate('/signUp');
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
<<<<<<< HEAD
        <UnderlineTextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
=======
        <UnderlineTextField placeholder="이름" value={id} onChange={(e) => setId(e.target.value)} />
>>>>>>> upstream/hehelee
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
        <Spacing height={20} />
        <Button onClick={handleSignUp}>회원가입</Button>
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
