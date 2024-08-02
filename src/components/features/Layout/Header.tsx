import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const chooseAPI = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('backend', e.target.value);
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
        <Select placeholder="백엔드 API 선택" w="300px" colorScheme="yellow" onChange={chooseAPI}>
          <option value="김해경">김해경</option>
          <option value="박서현">박서현</option>
          <option value="윤정훈">윤정훈</option>
          <option value="이은경">이은경</option>
          <option value="이택">이택</option>
        </Select>
        <RightWrapper>
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
const RightWrapper = styled.div``;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
