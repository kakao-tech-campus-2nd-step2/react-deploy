import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

import { Container } from "@/components/common/layouts/Container";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";
import { Select } from "@chakra-ui/react";
import { updateFetchInstance } from "@/api/instance";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedApi, setSelectedApi] = useState<string>(() => {
    return localStorage.getItem("selectedApi") || "";
  });

  useEffect(() => {
    const savedApi = localStorage.getItem("selectedApi");
    if (savedApi) {
      setSelectedApi(savedApi);
      setApiInstance(savedApi);
    }
  }, []);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const setApiInstance = (selectedValue: string) => {
    let newApiBaseUrl;

    switch (selectedValue) {
      case "1":
        newApiBaseUrl = "http://43.202.61.101:8080";
        break;
      case "2":
        newApiBaseUrl = "https://api.parkminjae.com";
        break;
      case "3":
        newApiBaseUrl = "http://3.38.106.40:8080";
        break;
      case "4":
        newApiBaseUrl = "http://13.124.148.179:8080";
        break;
      default:
        newApiBaseUrl = "http://43.202.61.101:8080";
    }

    updateFetchInstance(newApiBaseUrl);
  };

  const setApi = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    localStorage.setItem("selectedApi", selectedValue);
    setSelectedApi(selectedValue);
    setApiInstance(selectedValue);
    window.location.reload(); // 창 새로고침
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
          <Select
            placeholder="백엔드 API 선택"
            onChange={setApi}
            value={selectedApi}
          >
            <option value="1">김상해</option>
            <option value="2">박민재</option>
            <option value="3">박혜연</option>
            <option value="4">이진솔</option>
          </Select>
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
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  width: 60px;
`;
