import { Box, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useApi } from '@/provider/Api';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { setApiInfo } = useApi();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setApiInfo(event.target.value);
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
        <Box display="flex" justifyContent="space-between" gap="2rem" alignItems="center">
          <Select placeholder="API 선택" onChange={handleApiChange} minWidth="7rem">
            <option value="1">이상희</option>
            <option value="2">장우석</option>
            <option value="3">정수현</option>
            <option value="4">탁정민</option>
          </Select>
          <RightWrapper>
            {authInfo ? (
              <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
            ) : (
              <LinkButton onClick={handleLogin}>로그인</LinkButton>
            )}
          </RightWrapper>
        </Box>
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
  width: 100%;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
