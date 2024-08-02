import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import RegisterForm from './RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <FormWrapper>
        <RegisterForm navigate={navigate} />
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

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;
`;

export default RegisterPage;
