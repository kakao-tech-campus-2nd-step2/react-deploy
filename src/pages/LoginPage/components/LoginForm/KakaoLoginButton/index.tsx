import { css } from '@emotion/react';

import kakao_login from '@/assets/kakao-login.png';

import { Container } from '@/components/ui/Layout/Container';

export const KakaoLoginButton = () => {
  const onClick = () => {
    window.location.href = '/api/oauth/kakao/login';
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
