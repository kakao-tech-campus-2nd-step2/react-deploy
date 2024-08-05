import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/api/utils';
import { Button } from '@/components/common/Button';
import { UnderlineTextField } from '@/components/common/Form/Input/UnderlineTextField';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { IEnrollForm } from '@/components/features/Login/EnrollForm';

interface ILoginForm extends IEnrollForm {}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleConfirm,
}: ILoginForm) => {
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      handleConfirm();
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      alert('이메일과 비밀번호 모두 입력해주세요.');
      return;
    }
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <UnderlineTextField placeholder="이메일" value={email} onChange={setEmail} />
      <Spacing />
      <UnderlineTextField
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={setPassword}
      />
      <Spacing
        height={{
          initial: 40,
          sm: 60,
        }}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
};
