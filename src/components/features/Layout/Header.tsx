import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { apiOptionLocalStorage } from '@/utils/storage';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authInfo = useAuth();
  // const [currentApi, setCurrentApi] = useState('');
  const currentApi = apiOptionLocalStorage.get() || 'API 선택';

  const NavButtonList = [
    { name: '홈', path: RouterPath.home },
    { name: '위시', path: RouterPath.wish },
  ];

  const ApiList = ['김은선', '박준석', '이도훈', '안재민'];
  const ApiListAscending = ApiList.sort();

  const handleApiOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    apiOptionLocalStorage.set(e.target.value);
    window.location.reload(); // 바뀐 apiOption 반영하기 위함
  };

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  return (
    <Wrapper borderBottom={location.pathname === RouterPath.wish}>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <LogoWrapper>
          <Link to={RouterPath.home}>
            <Logo
              src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
              alt="카카오 선물하기 로고"
            />
          </Link>
        </LogoWrapper>
        <NavBarWrapper>
          <NavBar>
            {NavButtonList.map((button) => (
              <NavButton key={button.name}>
                <NavButtonText
                  to={button.path}
                  aria-current={location.pathname === button.path ? 'page' : undefined}
                >
                  {button.name}
                </NavButtonText>
              </NavButton>
            ))}
          </NavBar>
        </NavBarWrapper>
        <ApiSelectorWrapper>
          <ApiSelector onChange={handleApiOption} defaultValue={currentApi}>
            <option value="API 선택" disabled>
              API 선택
            </option>
            {ApiListAscending.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </ApiSelector>
        </ApiSelectorWrapper>
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

export const HEADER_HEIGHT = '80px';

const Wrapper = styled.header<{ borderBottom: boolean }>`
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;

  border-bottom: ${({ borderBottom }) => (borderBottom ? '1px solid #ededed' : 'none')};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 50px;
`;

const Logo = styled.img`
  height: 100%;
  max-height: ${HEADER_HEIGHT};
`;

//

const NavBarWrapper = styled.nav`
  padding: 20px 20px 20px 0;
  height: 100%;
`;

const NavBar = styled.ul`
  display: flex;
  list-style: none;
`;

const NavButton = styled.li`
  position: relative;
  padding-right: 10px;
  list-style: none;
`;

const NavButtonText = styled(Link)`
  display: block;
  padding: 11px 10px 7px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  &[aria-current='page']:after {
    position: absolute;
    left: 8px;
    right: 16px;
    bottom: 5px;
    height: 2px;
    background-color: #000;
    content: '';
  }
`;

//

const ApiSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  margin-right: 20px;
`;

const ApiSelector = styled.select`
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ededed;
`;

//

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: auto; */
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;
