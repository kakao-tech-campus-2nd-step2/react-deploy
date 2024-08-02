import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type BackendContextType = {
  backendUrl: string;
  selectBackend: (url: string) => void;
};

const BackendContext = createContext<BackendContextType | undefined>(undefined);

export const BackendProvider = ({ children }: { children: ReactNode }) => {
  const [backendUrl, setBackendUrl] = useState('http://3.35.17.240:8080');

  useEffect(() => {
    const savedBackendUrl = localStorage.getItem('backendUrl');
    if (savedBackendUrl) {
      setBackendUrl(savedBackendUrl);
    }
  }, []);

  const selectBackend = (url: string) => {
    setBackendUrl(url);
    localStorage.setItem('backendUrl', url);
  };

  return (
    <BackendContext.Provider value={{ backendUrl, selectBackend }}>
      {children}
    </BackendContext.Provider>
  );
};

export const useBackend = () => {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend must be used within a BackendProvider');
  }
  return context;
};
