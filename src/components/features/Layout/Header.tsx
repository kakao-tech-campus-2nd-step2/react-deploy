import styled from '@emotion/styled';
import type { QueryKey} from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiServers, changeServerUrl, fetchCategories } from '@/api/instance/index';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const queryClient = useQueryClient();

  const [selectedServer, setSelectedServer] = useState<string>(apiServers[0].name);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleServerChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelectedServer(selectedName);
    changeServerUrl(selectedName);

    const queryKey: QueryKey = ['categories'] as const; 
    queryClient.invalidateQueries({ queryKey: ['products'] });

    try {
      await queryClient.fetchQuery({
        queryKey,
        queryFn: fetchCategories,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
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
          <ServerSelector value={selectedServer} onChange={handleServerChange}>
            {apiServers.map((server) => (
              <option key={server.name} value={server.name}>
                {server.name}
              </option>
            ))}
          </ServerSelector>
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

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 16px;
`;

const ServerSelector = styled.select`
  font-size: 14px;
  margin-right: 16px;
  padding: 4px 8px;
  cursor: pointer;
`;
