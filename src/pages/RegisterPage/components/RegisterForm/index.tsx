import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { register } from '@/api/services/auth/register';
import { ROUTER_PATH } from '@/routes/path';
import { RegisterFields, RegisterSchema } from '@/schema/index';

import { Alert } from '@/components/ui/Dialog/Alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';

import { buttonStyle, formContainerStyle } from './styles';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // TODO: 회원 가입 성공 메세지 toast 띄우기
      navigate(ROUTER_PATH.LOGIN);
    },
    onError: (error) => {
      setAlertMessage(error.message);
      onOpen();
    },
  });

  const form = useForm<RegisterFields>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleCloseAlert = () => {
    onClose();
    setAlertMessage('');
  };

  const handleSubmit = form.handleSubmit(() => mutate(form.getValues()));

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} css={formContainerStyle}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder=" test@gmail.com"
                  variant="flushed"
                  focusBorderColor="black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>이름</FormLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  placeholder=" 춘식이"
                  variant="flushed"
                  focusBorderColor="black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="password"
                  placeholder=" ******"
                  variant="flushed"
                  focusBorderColor="black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          width="30rem"
          onClick={handleSubmit}
          disabled={status === 'pending'}
          css={buttonStyle}
        >
          회원가입
        </Button>
        {isOpen && (
          <Alert
            message={alertMessage}
            isOpen={isOpen}
            onClose={handleCloseAlert}
          />
        )}
      </form>
    </Form>
  );
};
