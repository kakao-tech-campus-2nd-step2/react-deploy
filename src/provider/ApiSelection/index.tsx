// baseUrl 을 전역으로 관리해서, 다르게 서버 주소 사용
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

type BaseUrlContextType = {
  baseUrl: string;
  setBaseUrl: (url: string) => void;
};

const BaseUrlContext = createContext<BaseUrlContextType | undefined>(undefined);

export const BaseUrlProvider = ({ children }: { children: ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>('');

  return (
    <BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>{children}</BaseUrlContext.Provider>
  );
};

export const useBaseUrl = () => {
  const context = useContext(BaseUrlContext);
  if (!context) {
    throw new Error('useBaseUrl must be used within a BaseUrlProvider');
  }
  return context;
};
