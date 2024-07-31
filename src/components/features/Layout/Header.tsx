import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

const servers = [
  { name: '백엔드 API 선택', value: '' },
  { name: '권도윤', value: 'server1' },
  { name: '배규민', value: 'server2' },
  { name: '석혜원', value: 'server3' },
  { name: '신성민', value: 'server4' },
];

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedServer, setSelectedServer] = useState(servers[0].value);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleServerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServer(event.target.value);
    // TODO: 서버 변경 로직 추가
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
            <Select
              value={selectedServer}
              onChange={handleServerChange}
              variant="outline"
              size="sm"
            >
              {servers.map((server) => (
                <option key={server.value} value={server.value}>
                  {server.name}
                </option>
              ))}
            </Select>
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
