import { useQueryClient } from '@tanstack/react-query';
import type { ReactNode} from 'react';
import { createContext,useContext, useEffect, useState } from 'react';


interface ApiContextType {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}
// 변경 필요!!!
const defaultState: ApiContextType = {
  apiUrl: 'https://example.com',
  setApiUrl: () => {}
};

const ApiContext = createContext<ApiContextType>(defaultState);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const [apiUrl, setApiUrl] = useState<string>('https://example.com');
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
