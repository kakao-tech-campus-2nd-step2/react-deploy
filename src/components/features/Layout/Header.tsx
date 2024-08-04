import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth/AuthContext';
import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { setBaseURL } = useBaseURL();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    let newBaseURL;

    switch (selectedValue) {
      case 'option1':
        newBaseURL = 'http://3.35.17.43:8080';
        break;
      case 'option2':
        newBaseURL = 'http://3.37.208.221:8080';
        break;
      case 'option3':
        newBaseURL = 'http://3.36.122.221:8080';
        break;
      case 'option4':
        newBaseURL = 'http://13.124.49.189:8080';
        break;
      default:
        newBaseURL = '';
    }

    setBaseURL(newBaseURL); // Context의 baseURL 업데이트
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
          <Select placeholder='Select option' onChange={handleSelectChange}>
            <option value='option1'>권다운</option>
            <option value='option2'>김건</option>
            <option value='option3'>신형진</option>
            <option value='option4'>유승욱</option>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 260px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  width: 50px;
  margin-left: 10px;
`;
