import { Box, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { updateFetchInstance } from '@/api/instance';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleServerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServer = event.target.value;
    sessionStorage.setItem('selectedServer', selectedServer);
    updateFetchInstance();
    window.location.reload();
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
          <SelectContainer>
            <Box ml={4}>
              <Select placeholder="백엔드 API 선택" onChange={handleServerChange}>
                <option value="server1">권도윤</option>
                <option value="server2">배규민</option>
                <option value="server3">석혜원</option>
                <option value="server4">신성민</option>
              </Select>
            </Box>
          </SelectContainer>

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
  align-items: center;
`;

const SelectContainer = styled.div`
  margin-right: 8px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 8px;
`;
