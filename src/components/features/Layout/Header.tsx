import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Container } from "@/components/common/layouts/Container";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const [selectedApi, setSelectedApi] = useState("백엔드 API 선택");

  useEffect(() => {
    const storedApi = sessionStorage.getItem("selectedApi");
    if (storedApi) {
      setSelectedApi(storedApi);
    } else {
      sessionStorage.setItem("selectedApi", "백엔드 API 선택");
    }
  }, []);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleApiChange = (event: any) => {
    const apiValue = event.target.value;
    setSelectedApi(apiValue);
    sessionStorage.setItem("selectedApi", apiValue);

    if (apiValue !== "백엔드 API 선택") {
      connectToApi(apiValue);
    }
  };

  const connectToApi = (api: any) => {
    let url;
    switch (api) {
      case "신예준":
        url = "https://pnuece.pnu.app/admin/products";
        break;
      case "원윤서":
        url = "http://3.37.113.212:8080/manager/products";
        break;
      case "이영준":
        url = "https://muna76.tistory.com/116";
        break;
      case "황수환":
        url = "https://kakao-gift-api.shop/admin";
        break;
      default:
        url = null;
    }
    if (url) {
      window.location.href = url;
    }
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
          <Select onChange={handleApiChange} value={selectedApi}>
            <option value="백엔드 API 선택" disabled>
              백엔드 API 선택
            </option>
            <option value="신예준">신예준</option>
            <option value="원윤서">원윤서</option>
            <option value="이영준">이영준</option>
            <option value="황수환">황수환</option>
          </Select>
          {authInfo ? (
            <>
              <LinkButton onClick={() => navigate(RouterPath.admin)}>
                관리자
              </LinkButton>
              <LinkButton onClick={() => navigate(RouterPath.myAccount)}>
                내 계정
              </LinkButton>
            </>
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
`;

const Select = styled.select`
  margin-right: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
