import { Button } from "@/components/common/Button";
import styled from "@emotion/styled";
import KAKAO_LOGO from "@/assets/kakao_logo.svg";

export const KakaoLogin = () => {
  const Rest_api_key = "0554f7c2eaba28fbf805032da1e0b14d";
  const redirect_uri = "http://43.203.28.55:8080/api/oauth/token"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <Button onClick={handleLogin}>카카오 로그인</Button>
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
`;
