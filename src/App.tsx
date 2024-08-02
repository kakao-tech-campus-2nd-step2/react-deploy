import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { APIBaseURLProvider } from './provider/APIBaseURL';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <APIBaseURLProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </APIBaseURLProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
