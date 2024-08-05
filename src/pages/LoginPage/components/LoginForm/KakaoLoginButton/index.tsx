import { css } from '@emotion/react';

import { currentBaseURL } from '@/api/config';
import kakao_login from '@/assets/kakao-login.png';

import { Container } from '@/components/ui/Layout/Container';

export const KakaoLoginButton = () => {
  const onClick = () => {
    window.location.href = `${currentBaseURL}/api/oauth/kakao/login?redirect-url=${import.meta.env.VITE_REDIRECT_URL}`;
  };

  return (
    <Container justifyContent="center">
      <button onClick={onClick}>
        <img src={kakao_login} alt="kakao-login-button" css={buttonStyle} />
      </button>
    </Container>
  );
};

const buttonStyle = css({
  maxWidth: '3rem',
});
