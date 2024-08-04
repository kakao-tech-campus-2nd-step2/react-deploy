import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { fetchInstance, setFetchInstanceBaseURL } from '@/api/instance';

type ApiInfo = {
  url: string;
};

type ApiContextData = {
  apiInfo: ApiInfo;
  setApiInfo: (value: string) => void;
};

const defaultApiInfo: ApiInfo = {
  url: fetchInstance.defaults.baseURL!,
};

export const ApiContext = createContext<ApiContextData | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(defaultApiInfo);

  const handleApiInfo = (value: string) => {
    let newUrl: string;
    switch (value) {
      case '1':
        newUrl = process.env.REACT_APP_API_LEE ?? fetchInstance.defaults.baseURL!;
        break;
      case '2':
        newUrl = process.env.REACT_APP_API_JANG ?? fetchInstance.defaults.baseURL!;
        break;
      case '3':
        newUrl = process.env.REACT_APP_API_JUNG ?? fetchInstance.defaults.baseURL!;
        break;
      case '4':
        newUrl = process.env.REACT_APP_API_TAK ?? fetchInstance.defaults.baseURL!;
        break;
      default:
        newUrl = fetchInstance.defaults.baseURL!;
    }
    setApiInfo({ url: newUrl });
    setFetchInstanceBaseURL(newUrl);
  };

  return (
    <ApiContext.Provider value={{ apiInfo, setApiInfo: handleApiInfo }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextData => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
