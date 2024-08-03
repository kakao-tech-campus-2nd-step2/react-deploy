import { Button,Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import useAuth from '../../api/hooks/useAuth';

interface RegisterFormProps {
  navigate: (path: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ navigate }) => {
  const { register, loading, error, message } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const token = await register(email, password);
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      alert('회원가입 및 로그인 성공');
      navigate('/');
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb={2}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={2}
      />
      <Button onClick={handleRegister} disabled={loading} mb={2}>
        회원 가입
      </Button>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
