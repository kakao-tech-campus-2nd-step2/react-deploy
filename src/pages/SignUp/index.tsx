import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { type ChangeEvent, useState } from 'react';

import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';
import { userSignUp } from '@/api/hooks/useSignUp';

export const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const { mutate } = userSignUp();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    const { username, password, passwordConfirm } = formState;
    if (!username || !password || !passwordConfirm) {
      alert('모든 내용을 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 4) {
      alert('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    const SignUpInfo = {
      email: username,
      password: password,
    };

    mutate(SignUpInfo);
  };

  return (
    <Wrapper>
      <Text fontSize="30px" marginBottom="10px" fontWeight={700}>
        회원가입
      </Text>
      <FormWrapper>
        <UnderlineTextField
          name="username"
          placeholder="이름"
          type="email"
          value={formState.username}
          onChange={handleInputChange}
        />
        <Spacing />
        <UnderlineTextField
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formState.password}
          onChange={handleInputChange}
        />
        <Spacing />
        <UnderlineTextField
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          value={formState.passwordConfirm}
          onChange={handleInputChange}
        />

        <Spacing
          height={{
            initial: 40,
            sm: 60,
          }}
        />
        <Button onClick={handleConfirm}>회원가입</Button>
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

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;
