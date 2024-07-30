import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useLogin } from '@/api/hooks/auth/login.api';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();
  const loginMutation = useLogin();
  const { setAuthInfo } = useAuth();

  const handleConfirm = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const data = await loginMutation.mutateAsync({ email: id, password });
      setAuthInfo({ id: data.email, name: data.email, token: data.token });

      const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
      window.location.replace(redirectUrl);
    } catch (error: unknown) {
      alert('로그인 실패: ' + (error as Error).message);
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이름" value={id} onChange={(e) => setId(e.target.value)} />
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
      </FormWrapper>
      <Box display="flex" textAlign="center" alignItems="center" margin="10px">
        <Text fontSize="12px">아직 가입 안하셨을까요~? &nbsp; </Text>
        <Link to={RouterPath.register}>
          <Text fontWeight="700" color="blue">
            회원가입
          </Text>
        </Link>
      </Box>
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
