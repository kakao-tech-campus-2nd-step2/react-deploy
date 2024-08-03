import { useQueryClient } from '@tanstack/react-query';
import type { ReactNode} from 'react';
import { createContext,useContext, useEffect, useState } from 'react';

import { backend } from '@/config/backendConfig';

interface ApiContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const defaultState: ApiContextType = {
  apiUrl: backend.backend3,
  setApiUrl: () => {}
};

const ApiContext = createContext<ApiContextType>(defaultState);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [apiUrl, setApiUrl] = useState<string>(
    () => localStorage.getItem('apiUrl') || backend.backend3
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.setItem('apiUrl', apiUrl);
    queryClient.invalidateQueries();
  }, [apiUrl, queryClient]);

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);