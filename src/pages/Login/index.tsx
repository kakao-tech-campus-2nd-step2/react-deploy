import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { BASE_URL } from '@/api/instance';
import { breakpoints } from '@/styles/variants';
import { REST_API_KEY, REDIRECT_URI } from '@/provider/Auth/keys';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`; 
  
  const kakaologinHandler = () => {
    window.location.href = `${BASE_URL}/kakao/login`;
    // window.location.href = link;
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <Button onClick={kakaologinHandler}
        disabled 
        style={{
          cursor: 'not-allowed',
          opacity: 0.6,
        }}>
          카카오 로그인
        </Button>
        <Spacing height={20} />
        <Link to="./noneKakaoRegister">
          <Button>비카카오 회원가입</Button>
        </Link>
        <Spacing height={20} />
        <Link to="./noneKakaoLogin">
          <Button>비카카오 로그인</Button>
        </Link>
        <Spacing height={20} />
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: ${breakpoints.sm}) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

