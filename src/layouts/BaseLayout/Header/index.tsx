import logo from '@/assets/logo.png';
import { useAuth } from '@/provider/auth/useAuth';
import { colors } from '@/styles/variants/theme';

import { Content } from '@/components/Content';
import { Logo } from '@/components/Logo';
import { Container } from '@/components/ui/Layout/Container';

import { AdminButton } from './AdminButton';
import { AuthButton } from './AuthButton';
import { SelectAPI } from './SelectAPI';
import { headerStyle } from './styles';

export const Header = () => {
  const { authInfo } = useAuth();

  return (
    <Content
      css={headerStyle}
      backgroundColor={colors.white}
      height="3.5rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logo src={logo} alt="카카오 선물하기 로고" width="86" />
      <Container justifyContent="flex-end" alignItems="center" gap="1rem">
        <SelectAPI />
        <AuthButton />
        {authInfo?.userInfo.role === 'ADMIN' && <AdminButton />}
      </Container>
    </Content>
  );
};
