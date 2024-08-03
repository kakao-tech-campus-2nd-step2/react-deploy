import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import type { BaseURL } from '@/api/instance';
import { BASE_URL_LIST } from '@/api/instance';
import { Container } from '@/components/common/layouts/Container';
import { useServer } from '@/hooks/useServer';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const { server, chageServer } = useServer();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };
  const handleChangeServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    chageServer(e.target.value as BaseURL);
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
          <select value={server} onChange={handleChangeServer}>
            {Object.entries(BASE_URL_LIST).map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
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
  gap: 1rem;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
