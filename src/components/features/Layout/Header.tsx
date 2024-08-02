import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { updateBaseURL } from '@/api/instance';
export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [selectedUser, setSelectedUser] = useState('최유성');

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = e.target.value;
    setSelectedUser(user);
    switch (user) {
      case '최유성':
        updateBaseURL('http://3.36.86.203:8080');
        break;
      case '오승환':
        updateBaseURL('http://3.35.176.235:8080');
        break;
      case '고승현':
        updateBaseURL('http://13.209.84.167:8080');
        break;
      case '김병수':
        updateBaseURL('http://13.124.128.255:8080');
        break;
      default:
        updateBaseURL('http://3.36.86.203:8080');
    }
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
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="최유성">최유성</option>
            <option value="오승환">오승환</option>
            <option value="고승현">고승현</option>
            <option value="김병수">김병수</option>
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
`;
