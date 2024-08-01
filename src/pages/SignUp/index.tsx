import styled from '@emotion/styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { usePostRegister } from '@/api/hooks/usePostRegister';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import { breakpoints } from '@/styles/variants';

export const SignUpPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [queryParams] = useSearchParams();
    const { register } = usePostRegister();

    const handleConfirm = async () => {
        if (!id || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        } else if (!name) {
            alert('이름을 입력해주세요.')
            return
        }

        const result = await register({ name, email: id, password });

        if (!result) {
            const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
            return window.location.replace(redirectUrl);
        } else {
            alert(result);
        }
    };

    return (
        <Wrapper>
            <Logo src={KAKAO_LOGO} alt="카카고 CI" />
            <FormWrapper>
                <UnderlineTextField placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                <Spacing />
                <UnderlineTextField placeholder="이메일" value={id} onChange={(e) => setId(e.target.value)} />
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