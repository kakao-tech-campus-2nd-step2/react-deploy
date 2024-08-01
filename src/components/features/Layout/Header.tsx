// src/components/Header.tsx
import { Select } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { URLS } from "@/api/instance";
import { Container } from "@/components/common/layouts/Container";
import { useBaseUrl } from "@/provider/ApiSelection";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { baseUrl, setBaseUrl } = useBaseUrl(); // Context에서 setBaseUrl 가져오기

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };
  // 디버깅 차 콘솔 출력
  useEffect(() => {
    console.log(baseUrl);
  }, [baseUrl]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseUrl(event.target.value); // 선택된 URL로 BASE_URL 업데이트
  };

  return (
    <Wrapper>
      <Container
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>

        <RightWrapper>
          <ApiSelect
            placeholder="백엔드 서버 선택"
            onChange={handleSelectChange}
            defaultValue={URLS[0].name}
          >
            {URLS.map((info) => (
              <option key={info.id} value={info.url}>
                {info.name}
              </option>
            ))}
          </ApiSelect>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>
              내 계정
            </LinkButton>
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
  justify-content: flex-end;
`;

const LinkButton = styled.p`
  display: flex;
  align-items: center;
  width: 100px;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;

const ApiSelect = styled(Select)`
  width: 130px;
  font-size: 16px;
`;
