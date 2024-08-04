import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { backend } from '@/config/backendConfig';
import { useApi } from '@/provider/Api';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { apiUrl, setApiUrl } = useApi();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setApiUrl(event.target.value);
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
          <ApiSelector value={apiUrl} onChange={handleApiChange}>
            <option value={backend.backend1}>김민지</option>
            <option value={backend.backend2}>박상우</option>
            <option value={backend.backend3}>배민수</option>
          </ApiSelector>
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;

const ApiSelector = styled.select`
  width: 200px;
  height: 40px;
  border: 2px solid #444;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    border-color: #888;
  }
`;
