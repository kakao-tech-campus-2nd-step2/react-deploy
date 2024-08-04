import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { BackendProvider } from './provider/Auth/Backend'; // 추가
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BackendProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </BackendProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
