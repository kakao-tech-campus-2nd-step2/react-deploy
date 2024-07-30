import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth/AuthContext';
import { BaseURLProvider } from './provider/Auth/BaseUrlContext';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <BaseURLProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryClientProvider>
      </BaseURLProvider>
    </ChakraProvider>
  );
};

export default App;
