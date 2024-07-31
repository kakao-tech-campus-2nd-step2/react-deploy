import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchInstance, queryClient } from '@/api/instance';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

const BACKEND_URLS: { [key: string]: string } = {
  김태윤: 'http://43.202.1.135:8080',
  강수민: 'http://43.201.60.56:8080',
  유경미: 'http://3.17.81.229:8080',
};

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedName, setSelectedName] = useState(() => {
    const currentBaseUrl = fetchInstance.defaults.baseURL;
    return Object.keys(BACKEND_URLS).find((key) => BACKEND_URLS[key] === currentBaseUrl);
  });

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedName(selectedValue);
    fetchInstance.defaults.baseURL = BACKEND_URLS[selectedValue];
    queryClient.invalidateQueries().then(() => {
      navigate(RouterPath.home);
    });
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
          <Select onChange={handleSelectChange} value={selectedName}>
            {Object.keys(BACKEND_URLS).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
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
`;

const LinkButton = styled.p`
  margin-left: 10px;
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  height: 100%;
  display: block;

  padding: 8px 16px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: white;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;
