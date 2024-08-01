import styled from '@emotion/styled';

import { BASE_URL, fetchInstance } from '@/api/instance';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';

export const LoginPage = () => {
  const loginHandler = async () => {
    try {
      const response = await fetchInstance.get(`${BASE_URL}/api/auth/kakao`);
      const kakaoAuthUrl = response.headers.location;
      console.log(kakaoAuthUrl);
      if (kakaoAuthUrl) {
        window.location.href = kakaoAuthUrl;
      } else {
        alert('카카오 로그인 URL을 가져오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Failed to fetch Kakao login URL:', error);
      alert('카카오 로그인 URL을 가져오는 중 오류가 발생했습니다.');
    }
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <Button onClick={loginHandler} style={{ width: '300px' }}>
        카카오 로그인
      </Button>
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
