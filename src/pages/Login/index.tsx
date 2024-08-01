import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BASE_URL } from "@/api/instance";
import KAKAO_LOGO from "@/assets/kakao_logo.svg";
import { Button } from "@/components/common/Button";
import { UnderlineTextField } from "@/components/common/Form/Input/UnderlineTextField";
import { Spacing } from "@/components/common/layouts/Spacing";
import { breakpoints } from "@/styles/variants";
import { authSessionStorage } from "@/utils/storage";
export const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [queryParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const code = queryParams.get("code");
    if (code) {
      handleKaKaoAuth(code);
    }
  }, [queryParams]);

  const handleKaKaoAuth = async (code: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/oauth/kakao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("카카오 로그인에 실패했습니다.");
      }

      const data = await response.json();
      authSessionStorage.set(data.accessToken); // 액세스 토큰을 세션 스토리지에 저장

      window.location.replace(`${window.location.origin}/`);
    } catch (error) {
      console.error(error);
      alert("카카오 로그인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleKaKaoLogin = () => {
    window.location.replace(`${BASE_URL}/api/oauth/kakao`);
  };

  const handleConfirm = async () => {
    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/members/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: id, password }),
      });

      if (!response.ok) {
        throw new Error(
          "로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요."
        );
      }

      const data = await response.json();
      authSessionStorage.set(data.accessToken); // 로그인 성공 시 토큰 저장

      const redirectUrl =
        queryParams.get("redirect") ?? `${window.location.origin}/`;
      return window.location.replace(redirectUrl);
    } catch (error) {
      alert(error);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카고 CI" />
      <FormWrapper>
        <UnderlineTextField
          placeholder="이메일" // ID를 이메일로 변경
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
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
        <RegButton onClick={handleSignup}>회원가입</RegButton>
        <Button onClick={handleKaKaoLogin}>카카오 로그인</Button>
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

const RegButton = styled(Button)`
  background-color: rgb(235, 235, 235);
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
