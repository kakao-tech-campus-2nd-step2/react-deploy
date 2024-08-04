import { useState } from 'react';

export const useValidateEmail = (initialEmail = '') => {
  const [email, setEmail] = useState(initialEmail);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    setEmail(e.target.value);
    setIsEmailValid(validateEmail(email));
  };

  return { email, isEmailValid, handleEmailChange };
};
