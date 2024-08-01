import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { BASE_URLS } from '@/api/instance';
import { Container } from '@/components/common/layouts/Container';
import { useServer } from '@/hooks/useServer';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { server, changeServer } = useServer();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleChangeServer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeServer(e.target.value as keyof typeof BASE_URLS);
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
            {Object.keys(BASE_URLS).map((key) => (
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
