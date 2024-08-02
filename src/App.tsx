import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { ApiProvider } from './contexts/ApiContext';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ApiProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ApiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
