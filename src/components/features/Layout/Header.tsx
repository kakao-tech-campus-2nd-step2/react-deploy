import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

import { useState, useEffect } from 'react';

import { updateInstanceBaseURL } from '@/api/instance';

export const backendAPI: { [key: string]: string } = {
  backend_1: 'http://54.180.230.218:8080',
  backend_2: 'www.backend2.com',
  backend_3: 'www.backend3.com',
  backend_4: 'www.backend4.com',
};

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };
  const [selectedAPI, setSelectedAPI] = useState<string>(localStorage.getItem('selectedAPI') || backendAPI.backend_1);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAPI = backendAPI[e.target.value];
    setSelectedAPI(newAPI);
    updateInstanceBaseURL(newAPI);
    localStorage.setItem('selectedAPI', newAPI);
  };

  useEffect(() => {
    localStorage.setItem('selectedAPI', selectedAPI);
    updateInstanceBaseURL(selectedAPI);
  }, []);

  function isSelected(api: string): boolean {
    return api === selectedAPI ? true : false;
  }
  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png" alt="카카오 선물하기 로고" />
        </Link>
        <RightWrapper>
          <select onChange={handleSelect}>
            <option selected={isSelected(backendAPI.backend_1)} value="backend_1">
              이경빈
            </option>
            <option selected={isSelected(backendAPI.backend_2)} value="backend_2">
              이동현
            </option>
            <option selected={isSelected(backendAPI.backend_3)} value="backend_3">
              정현서
            </option>
            <option selected={isSelected(backendAPI.backend_4)} value="backend_4">
              신성희
            </option>
          </select>
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

export const HEADER_HEIGHT = '54px';

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
  gap: 20px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
