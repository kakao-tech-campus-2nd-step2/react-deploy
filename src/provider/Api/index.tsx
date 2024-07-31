// src/provider/BaseUrl.js
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { BASE_URL } from '@/constants/URI';

type ApiInfo = {
  url: string;
};

type ApiContextData = {
  apiInfo: ApiInfo;
  setApiInfo: (value: string) => void;
};

const defaultApiInfo: ApiInfo = {
  url: BASE_URL,
};

export const ApiContext = createContext<ApiContextData | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(defaultApiInfo);

  const handleApiInfo = (value: string) => {
    let newUrl = BASE_URL;
    switch (value) {
      case '1':
        newUrl = `${BASE_URL}/lee`;
        break;
      case '2':
        newUrl = `${BASE_URL}/jang`;
        break;
      case '3':
        newUrl = `${BASE_URL}/jung`;
        break;
      case '4':
        newUrl = `${BASE_URL}/tak`;
        break;
      default:
        newUrl = BASE_URL;
    }
    setApiInfo({ url: newUrl });
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
