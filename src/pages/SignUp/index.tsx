import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BASE_URL, fetchInstance } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 기존: fetch 사용 → 수정: 만들어진 instance 활용
      const response = await fetchInstance.post(`${BASE_URL}/api/members/register`, {
        email: email,
        password: password
      });
      const accessToken = response.headers.authorization;
      return { accessToken, name: response.data.name };
    } 
    
    catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;

        if (response?.status === 400) {
          const data = await response.data;
          console.error(data.message);
          alert('회원가입에 실패했습니다.');
        }
      }
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField
          placeholder="사용할 아이디를 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="사용할 비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <ButtonStyled onClick={handleSignUp}>회원가입</ButtonStyled>
        <LoginButton onClick={() => navigate('/login')}>로그인 페이지로 이동</LoginButton>
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
  background-color: #f7f9fc;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 480px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  background-color: #fee500;
  color: #000;
  padding: 12px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #fee50067;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  background-color: #eaeaea;
  color: #333;
  margin-top: 20px;
  padding: 12px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #d5d5d5;
  }
`;
