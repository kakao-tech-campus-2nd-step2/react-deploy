import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { type Server } from '@/types';

const servers: Server[] = [
  { name: 'API 선택', url: 'https://api.server0.com' },
  { name: '권도윤', url: 'https://api.server1.com' },
  { name: '배규민', url: 'https://api.server2.com' },
  { name: '석혜원', url: 'https://api.server3.com' },
  { name: '신성민', url: 'https://api.server4.com' },
];

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const [selectedServer, setSelectedServer] = useState(servers[0]);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleServerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const server = servers.find(s => s.name === selectedName);
    if (server) {
      setSelectedServer(server);
    }
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
          <Select value={selectedServer.name} onChange={handleServerChange}>
            {servers.map(server => (
              <option key={server.name} value={server.name}>
                {server.name}
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
  align-items: center;
`;

const Select = styled.select`
  margin-right: 16px;
  font-size: 14px;
  padding: 4px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
