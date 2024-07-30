import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth/AuthContext';
import { BaseURLProvider } from './provider/Auth/BaseUrlContext';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BaseURLProvider>
            <Routes />
          </BaseURLProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
