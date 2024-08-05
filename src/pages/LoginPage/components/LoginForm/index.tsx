import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/services/auth/login';
import { useLoginSuccess } from '@/pages/LoginPage/hooks/handleLoginSuccess';
import { LoginFields, LoginSchema } from '@/schema/index';

import { Alert } from '@/components/ui/Dialog/Alert';

import { KakaoLoginButton } from './KakaoLoginButton';
import { buttonStyle, formContainerStyle } from './styles';

export const LoginForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const { handleLoginSuccess } = useLoginSuccess();
  const { mutate, status } = useMutation({
    mutationFn: login,
    onSuccess: (data) => handleLoginSuccess(data),
    onError: (error) => {
      setAlertMessage(error.message);
      onOpen();
    },
  });

  const form = useForm<LoginFields>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCloseAlert = () => {
    onClose();
    setAlertMessage('');
  };

  const handleSubmit = form.handleSubmit(
    () => mutate(form.getValues()),
    (errors) => {
      const errorMessages =
        Object.values(errors).flatMap((error) => error.message)[0] || '';

      setAlertMessage(errorMessages);
      onOpen();
    }
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} css={formContainerStyle}>
      <Input
        {...form.register('email')}
        placeholder="이메일"
        variant="flushed"
        focusBorderColor="black"
      />
      <Input
        {...form.register('password')}
        type="password"
        placeholder="비밀번호"
        variant="flushed"
        focusBorderColor="black"
      />
      <Button
        type="submit"
        width="30rem"
        onClick={handleSubmit}
        disabled={status === 'pending'}
        css={buttonStyle}
      >
        로그인
      </Button>
      <Box position="relative" paddingY="6">
        <Divider />
        <AbsoluteCenter bg="white" px="4" color="GrayText">
          또는
        </AbsoluteCenter>
      </Box>
      <KakaoLoginButton />
      {isOpen && (
        <Alert
          message={alertMessage}
          isOpen={isOpen}
          onClose={handleCloseAlert}
        />
      )}
    </form>
  );
};
