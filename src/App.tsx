import { Box, ChakraProvider, Flex, Select } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect,useState } from 'react';

import { queryClient, setApiBaseUrl } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App: React.FC = () => {
  const [selectedEngineer, setSelectedEngineer] = useState('박민규');

  useEffect(() => {
    // 초기 로드 시 기본 URL 설정
    setApiBaseUrl(selectedEngineer);
  }, [selectedEngineer]);

  const handleEngineerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const engineer = event.target.value;
    setSelectedEngineer(engineer);
    setApiBaseUrl(engineer);
  };

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Select value={selectedEngineer} onChange={handleEngineerChange} width="200px">
                <option value="박민규">박민규</option>
                <option value="모아림">모아림</option>
                <option value="조홍식">조홍식</option>
              </Select>
            </Flex>
            <Box mt={4}>
              <Routes />
            </Box>
          </Box>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
