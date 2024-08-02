import styled from '@emotion/styled';
import type { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { createFetchInstance } from '@/api/instance';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const backendEngineers = ['백엔드 API 선택', '안승환', '오승규', '이세진', '조준환'];

  const [selectedBackend, setSelectedBackend] = useState('백엔드 API 선택');
  const [fetchInstance, setFetchInstance] = useState<AxiosInstance | null>(null);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleBackendChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const engineer = event.target.value;
    setSelectedBackend(engineer);

    // 선택된 엔지니어의 API 인스턴스를 설정
    const instance = createFetchInstance(engineer);
    setFetchInstance(instance);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fetchInstance) return; 

      try {
        const response = await fetchInstance.get('/path-to-endpoint');
        console.log(response.data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, [fetchInstance]);

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
          <Select onChange={handleBackendChange} value={selectedBackend}>
              {backendEngineers.map((engineer) => (
                <option key={engineer} value={engineer}>
                  {engineer}
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

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 16px;
`;

const Select = styled.select`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;