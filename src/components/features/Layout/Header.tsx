import { Select } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "@/components/common/layouts/Container";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";
import { authSessionStorage, currentApi } from "@/utils/storage";

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [apiUrl, setApiUrl] = useState(currentApi.get() ?? "http://15.165.67.223:8080");

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleUrl = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBaseURL = event.target.value;
    setApiUrl(selectedBaseURL);
    currentApi.set(event.target.value);

    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>
        <RightWrapper>
          <Select onChange={handleUrl} defaultValue={apiUrl}>
            <option value="http://15.165.67.223:8080">심규민</option>
            <option value="http://3.34.196.131:8080">김동현</option>
          </Select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = "54px";

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;
const RightWrapper = styled.div`
  display: flex;
`;

const LinkButton = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
`;
