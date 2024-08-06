import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useJoin } from '@/api/hooks/useJoin';
import KAKAO_LOGO from '@/assets/kakao_logo.svg';

export const JoinPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: join } = useJoin();

  const handleJoin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    join({ email, password });
  };

  const formSpacing = useBreakpointValue({ base: 5, sm: 8 });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Image src={KAKAO_LOGO} alt="카카오 CI" boxSize="88px" />
      <VStack
        as="form"
        spacing={formSpacing}
        w="full"
        maxW="580px"
        p={{ base: 4, sm: 10 }}
        border={{ sm: '1px' }}
        borderColor={{ sm: 'gray.200' }}
      >
        <FormControl isRequired>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button onClick={handleJoin}>회원가입</Button>
      </VStack>
    </Box>
  );
};
